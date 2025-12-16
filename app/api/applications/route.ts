import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const { jobId, name, email, linkedinUrl } = body;

  if (!jobId || !name || !email) {
    return NextResponse.json(
      { error: "Preencha nome e e-mail." },
      { status: 400 }
    );
  }

  const jobIdNumber = Number(jobId);
  if (!Number.isInteger(jobIdNumber)) {
    return NextResponse.json({ error: "jobId inválido." }, { status: 400 });
  }

  const job = await prisma.job.findUnique({ where: { id: jobIdNumber } });
  if (!job) {
    return NextResponse.json(
      { error: "Vaga não encontrada." },
      { status: 404 }
    );
  }

  // ✅ cria a candidatura e cria/conecta candidato via email
  const application = await prisma.application.create({
    data: {
      jobId: jobIdNumber,
      candidate: {
        connectOrCreate: {
          where: { email },
          create: {
            name,
            email,
            linkedinUrl: linkedinUrl || null,
          },
        },
      },
    },
  });

  return NextResponse.json({ ok: true, applicationId: application.id });
}
