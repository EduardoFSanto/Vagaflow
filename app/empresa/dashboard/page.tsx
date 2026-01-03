import Link from "next/link";
import Header from "../../_components/Header";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getCompanyData() {
  // Por enquanto, pega a primeira empresa (depois adicionar auth)
  const company = await prisma.company.findFirst();

  if (!company) return null;

  const jobs = await prisma.job.findMany({
    where: { companyId: company.id },
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { applications: true },
      },
    },
  });

  return { company, jobs };
}

export default async function CompanyDashboard() {
  const data = await getCompanyData();

  if (!data) {
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <Header />
        <main className="mx-auto max-w-5xl px-6 py-12">
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-8 text-center">
            <p className="text-slate-400">
              Nenhuma empresa encontrada. Crie uma no banco primeiro.
            </p>
          </div>
        </main>
      </div>
    );
  }

  const { company, jobs } = data;
  const totalApplications = jobs.reduce(
    (sum, job) => sum + job._count.applications,
    0
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />

      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Dashboard - {company.name}</h1>
          <p className="mt-2 text-slate-400">
            Gerencie suas vagas e candidaturas
          </p>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
            <p className="text-sm text-slate-400">Vagas Ativas</p>
            <p className="text-3xl font-bold mt-2">{jobs.length}</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
            <p className="text-sm text-slate-400">Total de Candidaturas</p>
            <p className="text-3xl font-bold mt-2">{totalApplications}</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
            <p className="text-sm text-slate-400">Média por Vaga</p>
            <p className="text-3xl font-bold mt-2">
              {jobs.length > 0
                ? (totalApplications / jobs.length).toFixed(1)
                : "0"}
            </p>
          </div>
        </div>

        {/* Botão Criar Vaga */}
        <div className="mb-6">
          <Link
            href="/empresa/vagas"
            className="inline-flex items-center rounded-lg bg-indigo-600 px-6 py-3 font-semibold hover:bg-indigo-500"
          >
            + Nova Vaga
          </Link>
        </div>

        {/* Lista de Vagas */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Suas vagas</h2>

          {jobs.length === 0 ? (
            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-8 text-center">
              <p className="text-slate-400">
                Você ainda não publicou nenhuma vaga.
              </p>
            </div>
          ) : (
            jobs.map((job) => (
              <div
                key={job.id}
                className="rounded-xl border border-slate-800 bg-slate-900/40 p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{job.title}</h3>

                    <div className="mt-2 flex gap-2 text-sm flex-wrap">
                      <span className="rounded bg-slate-800 px-2 py-1">
                        📍 {job.location}
                      </span>
                      <span className="rounded bg-slate-800 px-2 py-1">
                        {job.workMode === "REMOTE" && "🏠 Remoto"}
                        {job.workMode === "HYBRID" && "🏢 Híbrido"}
                        {job.workMode === "ONSITE" && "🏢 Presencial"}
                      </span>
                      <span className="rounded bg-slate-800 px-2 py-1">
                        {job.seniority === "INTERN" && "🎓 Estágio"}
                        {job.seniority === "JUNIOR" && "🌱 Júnior"}
                        {job.seniority === "MID" && "⚡ Pleno"}
                        {job.seniority === "SENIOR" && "🚀 Sênior"}
                        {job.seniority === "LEAD" && "👑 Lead"}
                      </span>
                    </div>

                    <p className="mt-3 text-slate-400">
                      {job._count.applications} candidatura(s) •
                      <span className="text-sm text-slate-500 ml-2">
                        Criada em{" "}
                        {new Date(job.createdAt).toLocaleDateString("pt-BR")}
                      </span>
                    </p>
                  </div>

                  <Link
                    href={`/empresa/vagas/${job.slug}/candidatos`}
                    className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold hover:bg-indigo-500 whitespace-nowrap"
                  >
                    Ver candidatos
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
