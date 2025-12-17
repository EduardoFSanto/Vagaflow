import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ✅ garante que Prisma roda em Node (evita erro de Edge no futuro)
export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const { jobId, name, email, linkedinUrl } = body as {
    jobId: number | string;
    name: string;
    email: string;
    linkedinUrl?: string;
  };

  if (!jobId || !name || !email) {
    return NextResponse.json(
      { error: "Preencha jobId, nome e email." },
      { status: 400 }
    );
  }

  const jobIdNumber = Number(jobId);
  if (!Number.isInteger(jobIdNumber)) {
    return NextResponse.json({ error: "jobId inválido." }, { status: 400 });
  }

  const job = await prisma.job.findUnique({
    where: { id: jobIdNumber },
    select: { id: true },
  });

  if (!job) {
    return NextResponse.json(
      { error: "Vaga não encontrada." },
      { status: 404 }
    );
  }

  const application = await prisma.application.create({
    data: {
      // ✅ modo correto (relacionamento) — NÃO usa jobId aqui
      job: { connect: { id: jobIdNumber } },

      // ✅ aqui pode usar connectOrCreate
      candidate: {
        connectOrCreate: {
          where: { email },
          create: {
            name,
            email,
            linkedinUrl: linkedinUrl ? String(linkedinUrl) : null,
          },
        },
      },
    },
    select: { id: true },
  });

  return NextResponse.json({ ok: true, applicationId: application.id });
}
