import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma, WorkMode, Seniority } from "@prisma/client";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const runtime = "nodejs";

/* =========================
   Schema de validação
========================= */
const createJobSchema = z.object({
  title: z.string().min(3).max(120),
  description: z.string().min(10).max(5000),

  // opcionais (usam default do Prisma se não vierem)
  location: z.string().min(2).max(120).optional(),
  workMode: z.nativeEnum(WorkMode).optional(),
  seniority: z.nativeEnum(Seniority).optional(),
});

/* =========================
   Utils
========================= */
function slugify(input: string) {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/* =========================
   GET — listar vagas
========================= */
export async function GET() {
  try {
    const jobs = await prisma.job.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        company: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    return NextResponse.json({ jobs }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao buscar vagas." },
      { status: 500 }
    );
  }
}

/* =========================
   POST — criar vaga
========================= */
export async function POST(req: Request) {
  try {
    /* 1️⃣ Sessão (obrigatória) */
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
    }

    /* 2️⃣ Parse do body */
    const json = await req.json();
    const parsed = createJobSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Payload inválido.",
          details: parsed.error.flatten(),
        },
        { status: 400 }
      );
    }

    const { title, description, location, workMode, seniority } = parsed.data;

    /* 3️⃣ Buscar empresa do usuário logado */
    const company = await prisma.company.findUnique({
      where: {
        userId: session.user.id,
      },
    });

    if (!company) {
      return NextResponse.json(
        { error: "Empresa não encontrada para este usuário." },
        { status: 404 }
      );
    }

    /* 4️⃣ Gerar slug único */
    const baseSlug = slugify(title);
    let slug = baseSlug;

    for (let i = 1; i < 20; i++) {
      const exists = await prisma.job.findUnique({
        where: { slug },
      });

      if (!exists) break;
      slug = `${baseSlug}-${i}`;
    }

    /* 5️⃣ Criar vaga */
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
      select: {
        id: true,
        slug: true,
      },
    });

    return NextResponse.json({ ok: true, job }, { status: 201 });
  } catch (err) {
    console.error(err);

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return NextResponse.json(
          { error: "Valor único já existe." },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { error: "Erro no banco de dados.", code: err.code },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 }
    );
  }
}
