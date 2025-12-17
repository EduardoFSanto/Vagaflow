// app/vaga/[id]/page.tsx
import { prisma } from "@/lib/prisma"; // Ajuste a importação do prisma
import { notFound } from "next/navigation"; // Para exibir página 404 caso a vaga não seja encontrada

export default async function JobPage({ params }: { params: { id: string } }) {
  // Busca a vaga pelo ID
  const job = await prisma.job.findUnique({
    where: { id: parseInt(params.id) }, // Converte o ID da URL para número
    include: { company: true },
  });

  if (!job) {
    notFound(); // Se não encontrar a vaga, exibe a página 404
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
          <h1 className="text-2xl font-semibold tracking-tight">{job.title}</h1>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12">
        <section className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
          <h3 className="text-lg font-semibold text-slate-50">
            {job.company.name}
          </h3>
          <p className="text-sm text-slate-400">{job.company.slug}</p>
          <p className="text-sm text-slate-400">{job.description}</p>
          <div className="mt-4 text-sm text-slate-500">
            Localização: {job.location}
          </div>
          <div className="text-sm text-slate-500">
            Modalidade: {job.workMode}
          </div>
        </section>
      </main>
    </div>
  );
}
