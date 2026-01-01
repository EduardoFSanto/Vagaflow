import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { z } from "zod";

export const runtime = "nodejs";

const applySchema = z.object({
  jobId: z.number().int().positive(),
  name: z.string().min(2).max(120),
  email: z.string().email().max(200),
  message: z.string().max(2000).optional(),
});

export async function POST(req: Request) {
  let json: unknown;

  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const parsed = applySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Payload inválido.", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { jobId, name, email, message } = parsed.data;

  try {
    const result = await prisma.$transaction(async (tx) => {
      const job = await tx.job.findUnique({ where: { id: jobId } });
      if (!job) return { kind: "not_found" as const };

      const candidate = await tx.candidate.upsert({
        where: { email },
        update: { name },
        create: { name, email },
        select: { id: true },
      });

      const application = await tx.application.create({
        data: {
          jobId,
          candidateId: candidate.id,
          message,
        },
        select: { id: true },
      });

      return { kind: "ok" as const, applicationId: application.id };
    });

    if (result.kind === "not_found") {
      return NextResponse.json(
        { error: "Vaga não encontrada." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { ok: true, applicationId: result.applicationId },
      { status: 201 }
    );
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return NextResponse.json(
          { error: "Você já se candidatou para esta vaga." },
          { status: 409 }
        );
      }
    }
    console.error(err);
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}
