import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma, WorkMode, Seniority } from "@prisma/client";
import { z } from "zod";

export const runtime = "nodejs";

const createJobSchema = z.object({
  title: z.string().min(3).max(120),
  description: z.string().min(10).max(5000),
  companyId: z.number().int().positive().optional(),

  // opcionais (se não vierem, caem nos defaults do schema)
  location: z.string().min(2).max(120).optional(),
  workMode: z.nativeEnum(WorkMode).optional(),
  seniority: z.nativeEnum(Seniority).optional(),
});

function slugify(input: string) {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function GET() {
  const jobs = await prisma.job.findMany({
    orderBy: { createdAt: "desc" },
    include: { company: { select: { id: true, name: true, slug: true } } },
  });

  return NextResponse.json({ jobs }, { status: 200 });
}

export async function POST(req: Request) {
  let json: unknown;

  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const parsed = createJobSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Payload inválido.", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { title, description, companyId, location, workMode, seniority } =
    parsed.data;

  try {
    const company = companyId
      ? await prisma.company.findUnique({ where: { id: companyId } })
      : await prisma.company.findFirst();

    if (!company) {
      return NextResponse.json(
        {
          error:
            "Nenhuma empresa encontrada. Crie uma Company no banco primeiro.",
        },
        { status: 400 }
      );
    }

    // slug único (adiciona sufixo se já existir)
    const base = slugify(title);
    let slug = base;
    for (let i = 1; i < 20; i++) {
      const exists = await prisma.job.findUnique({ where: { slug } });
      if (!exists) break;
      slug = `${base}-${i}`;
    }

    const job = await prisma.job.create({
      data: {
        title,
        slug,
        description,
        companyId: company.id,
        ...(location ? { location } : {}),
        ...(workMode ? { workMode } : {}),
        ...(seniority ? { seniority } : {}),
      },
      select: { id: true, slug: true },
    });

    return NextResponse.json({ ok: true, job }, { status: 201 });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      // P2002 = unique constraint (slug/email etc.)
      if (err.code === "P2002") {
        return NextResponse.json(
          { error: "Valor único já existe." },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { error: "Erro no banco.", code: err.code },
        { status: 400 }
      );
    }

    console.error(err);
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}
