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

      <main className="mx-auto max-w-7xl px-6 py-20 space-y-20">
        {/* Hero Section */}
        <section className="relative min-h-[600px] flex flex-col justify-center">
          {/* Background gradient effect */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          <div className="space-y-8 max-w-3xl">
            <div className="space-y-4">
              <div className="inline-block">
                <span className="px-4 py-2 rounded-full bg-indigo-900/40 border border-indigo-500/30 text-indigo-300 text-sm font-medium">
                  ✨ Oportunidades esperando por você
                </span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Conecte com os melhores
                </span>
                <br />
                <span className="text-white">talentos e oportunidades</span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed">
                O VagaFlow é a plataforma que conecta candidatos ambiciosos com empresas inovadoras. 
                Encontre sua próxima oportunidade de carreira ou os talentos que sua empresa precisa.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/vagas"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-8 py-4 font-semibold text-white hover:bg-indigo-500 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-indigo-500/40"
              >
                <span>Explorar vagas</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <Link
                href="/empresa/vagas"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-600 bg-slate-900/50 px-8 py-4 font-semibold text-white hover:bg-slate-800 hover:border-indigo-500 transition-all duration-300 backdrop-blur"
              >
                <span>Publicar vaga</span>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-800">
              <div>
                <div className="text-3xl font-bold text-indigo-400">500+</div>
                <p className="text-sm text-slate-400 mt-1">Vagas Ativas</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400">1.2K+</div>
                <p className="text-sm text-slate-400 mt-1">Candidatos</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-pink-400">98%</div>
                <p className="text-sm text-slate-400 mt-1">Taxa de Sucesso</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Jobs Section */}
        <section className="space-y-8">
          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold">Vagas em destaque</h2>
            <p className="text-slate-400 text-lg">
              {featuredJobs.length > 0
                ? `Confira as ${featuredJobs.length} vagas mais recentes`
                : "Nenhuma vaga disponível no momento"}
            </p>
          </div>

          {featuredJobs.length === 0 ? (
            <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/60 to-slate-900/20 p-12 text-center">
              <div className="text-4xl mb-4">📋</div>
              <p className="text-slate-400 text-lg">
                Nenhuma vaga publicada ainda. Seja o primeiro a publicar uma vaga!
              </p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {featuredJobs.map((job) => (
                <Link
                  key={job.id}
                  href={`/vagas/${job.slug}`}
                  className="group relative rounded-2xl border border-slate-700 bg-slate-900/40 p-6 hover:border-indigo-500 hover:bg-slate-900/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10 backdrop-blur"
                >
                  {/* Hover gradient */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 transition-opacity duration-300 -z-10"></div>

                  <div className="space-y-3">
                    <div>
                      <h3 className="text-lg font-bold group-hover:text-indigo-400 transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-sm text-slate-400 mt-1">
                        {job.company.name}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1 rounded-lg bg-slate-800/60 px-3 py-1.5 text-xs font-medium text-slate-300 border border-slate-700">
                        📍 {job.location}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-lg bg-slate-800/60 px-3 py-1.5 text-xs font-medium text-slate-300 border border-slate-700">
                        {job.workMode === "REMOTE" && "🏠 Remoto"}
                        {job.workMode === "HYBRID" && "🏢 Híbrido"}
                        {job.workMode === "ONSITE" && "🏭 Presencial"}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-slate-700/50">
                      <p className="text-xs text-slate-500">
                        <span className="text-indigo-400 font-semibold">{job._count.applications}</span> candidatura(s)
                      </p>
                    </div>
                  </div>

                  {/* Arrow indicator */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-indigo-400 text-xl">→</span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {featuredJobs.length > 0 && (
            <div className="flex justify-center pt-4">
              <Link
                href="/vagas"
                className="group inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-semibold text-lg transition-all hover:gap-3"
              >
                Ver todas as vagas
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          )}
        </section>

        {/* CTA Section for Companies */}
        <section className="relative rounded-2xl overflow-hidden border border-indigo-500/30 bg-gradient-to-br from-indigo-950/40 via-purple-950/20 to-slate-900/40 p-12 backdrop-blur">
          {/* Background elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-2xl space-y-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">Está recrutando?</h2>
              <p className="mt-3 text-lg text-slate-300">
                Chegue aos melhores talentos do mercado. Publique suas vagas em segundos e conecte-se com candidatos qualificados.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/empresa/vagas"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 font-semibold text-white hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-105"
              >
                <span>Publicar vaga grátis</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <button className="inline-flex items-center justify-center rounded-xl border border-slate-600 bg-slate-900/30 px-8 py-4 font-semibold text-white hover:border-indigo-500 hover:bg-slate-800/50 transition-all duration-300 backdrop-blur">
                Saiba mais
              </button>
            </div>

            {/* Benefits */}
            <div className="grid sm:grid-cols-3 gap-4 pt-6 border-t border-slate-700/50">
              <div className="space-y-1">
                <div className="text-2xl">⚡</div>
                <p className="font-semibold text-white">Rápido</p>
                <p className="text-sm text-slate-400">Publique em segundos</p>
              </div>
              <div className="space-y-1">
                <div className="text-2xl">🎯</div>
                <p className="font-semibold text-white">Direcionado</p>
                <p className="text-sm text-slate-400">Encontre perfis exatos</p>
              </div>
              <div className="space-y-1">
                <div className="text-2xl">💰</div>
                <p className="font-semibold text-white">Gratuito</p>
                <p className="text-sm text-slate-400">Sem taxas ocultas</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
