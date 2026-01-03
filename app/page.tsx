import Link from "next/link";
import Header from "./_components/Header";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getFeaturedJobs() {
  return await prisma.job.findMany({
    take: 3,
    orderBy: { createdAt: "desc" },
    include: {
      company: {
        select: { name: true },
      },
      _count: {
        select: { applications: true },
      },
    },
  });
}

export default async function Home() {
  const featuredJobs = await getFeaturedJobs();

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />

      <main className="mx-auto max-w-5xl px-6 py-16 space-y-16">
        {/* Hero */}
        <section>
          <h2 className="text-4xl font-bold">Encontre a vaga ideal</h2>
          <p className="mt-4 text-slate-400 max-w-2xl">
            O VagaFlow conecta talentos às empresas. Se você é candidato, envie
            seu currículo. Se é empresa, publique vagas em poucos passos.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              href="/vagas"
              className="inline-flex items-center rounded-xl bg-indigo-600 px-6 py-3 font-semibold hover:bg-indigo-500 transition-all"
            >
              Quero me candidatar
            </Link>
            <Link
              href="/empresa/vagas"
              className="inline-flex items-center rounded-xl border border-slate-700 bg-slate-900/40 px-6 py-3 font-semibold hover:bg-slate-900/60 transition-all"
            >
              Publicar vaga
            </Link>
          </div>
        </section>

        {/* Vagas em Destaque */}
        <section>
          <div className="mb-6">
            <h3 className="text-2xl font-semibold">Vagas em destaque</h3>
            <p className="mt-2 text-slate-400">
              {featuredJobs.length > 0
                ? `${featuredJobs.length} vaga(s) disponível(is)`
                : "Nenhuma vaga disponível no momento"}
            </p>
          </div>

          {featuredJobs.length === 0 ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8 text-center">
              <p className="text-slate-400">
                No momento não há vagas publicadas. Empresas podem criar vagas
                na área da empresa.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {featuredJobs.map((job) => (
                <Link
                  key={job.id}
                  href={`/vagas/${job.slug}`}
                  className="group rounded-xl border border-slate-800 bg-slate-900/40 p-6 hover:border-indigo-600 hover:bg-slate-900/60 transition-all"
                >
                  <h4 className="text-lg font-semibold group-hover:text-indigo-400 transition-colors">
                    {job.title}
                  </h4>
                  <p className="mt-1 text-sm text-slate-400">
                    {job.company.name}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    <span className="rounded bg-slate-800 px-2 py-1">
                      📍 {job.location}
                    </span>
                    <span className="rounded bg-slate-800 px-2 py-1">
                      {job.workMode === "REMOTE" && "🏠 Remoto"}
                      {job.workMode === "HYBRID" && "🏢 Híbrido"}
                      {job.workMode === "ONSITE" && "🏢 Presencial"}
                    </span>
                  </div>

                  <p className="mt-3 text-xs text-slate-500">
                    {job._count.applications} candidatura(s)
                  </p>
                </Link>
              ))}
            </div>
          )}

          {featuredJobs.length > 0 && (
            <div className="mt-6 text-center">
              <Link
                href="/vagas"
                className="text-indigo-400 hover:text-indigo-300 font-medium"
              >
                Ver todas as vagas →
              </Link>
            </div>
          )}
        </section>

        {/* CTA para Empresas */}
        <section className="rounded-2xl border border-indigo-800/50 bg-gradient-to-br from-indigo-950/50 to-slate-900/40 p-8">
          <h3 className="text-2xl font-semibold">Está contratando?</h3>
          <p className="mt-2 text-slate-400">
            Publique suas vagas e conecte-se com os melhores talentos.
          </p>
          <Link
            href="/empresa/vagas"
            className="mt-4 inline-flex items-center rounded-lg bg-indigo-600 px-6 py-3 font-semibold hover:bg-indigo-500 transition-all"
          >
            Criar vaga gratuita
          </Link>
        </section>
      </main>
    </div>
  );
}
