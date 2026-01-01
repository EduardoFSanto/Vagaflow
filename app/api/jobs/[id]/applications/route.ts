import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET(req: Request, ctx: { params?: { id?: string } }) {
  const pathname = new URL(req.url).pathname;

  // tenta pegar do params, e se não vier, pega do path
  // /api/jobs/1/applications  -> o penúltimo segmento é "1"
  const idStr = ctx.params?.id ?? pathname.split("/").at(-2);

  if (!idStr || !/^\d+$/.test(idStr)) {
    return NextResponse.json(
      { error: "id inválido.", debug: { idStr, pathname } },
      { status: 400 }
    );
  }

  const jobId = Number(idStr);

  const job = await prisma.job.findUnique({
    where: { id: jobId },
    select: { id: true, title: true, slug: true },
  });

  if (!job) {
    return NextResponse.json(
      { error: "Vaga não encontrada." },
      { status: 404 }
    );
  }

  const applications = await prisma.application.findMany({
    where: { jobId },
    orderBy: { createdAt: "desc" },
    include: {
      candidate: { select: { id: true, name: true, email: true } },
    },
  });

  return NextResponse.json({ job, applications }, { status: 200 });
}
