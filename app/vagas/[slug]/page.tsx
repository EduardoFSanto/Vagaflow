import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function JobPage({ params }: PageProps) {
  const { slug } = await params;

  if (!slug) notFound();

  const job = await prisma.job.findUnique({
    where: { slug },
    include: {
      company: true,
    },
  });

  if (!job) notFound();

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-4xl px-6 py-16">
        {/* Header da vaga */}
        <header className="border-b border-slate-800 pb-6">
          <h1 className="text-4xl font-bold">{job.title}</h1>

          <p className="mt-2 text-lg text-slate-400">{job.company.name}</p>

          <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-300">
            <span className="rounded-full bg-slate-800 px-3 py-1">
              {job.location}
            </span>

            <span className="rounded-full bg-slate-800 px-3 py-1">
              {job.workMode}
            </span>

            <span className="rounded-full bg-slate-800 px-3 py-1">
              {job.seniority}
            </span>
          </div>
        </header>

        {/* Descrição */}
        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">Descrição da vaga</h2>

          <p className="whitespace-pre-line leading-relaxed text-slate-300">
            {job.description}
          </p>
        </section>

        {/* CTA */}
        <section className="mt-12">
          <button className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold hover:bg-indigo-500 transition">
            Candidatar-se
          </button>
        </section>
      </div>
    </main>
  );
}
