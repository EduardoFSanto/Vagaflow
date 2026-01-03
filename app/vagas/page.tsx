import Link from "next/link";
import Header from "../_components/Header";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getJobs() {
  return await prisma.job.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      company: {
        select: { name: true, slug: true },
      },
      _count: {
        select: { applications: true },
      },
    },
  });
}

export default async function VagasPage() {
  const jobs = await getJobs();

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />

      <main className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Vagas abertas</h1>
          <p className="mt-2 text-slate-400">
            {jobs.length}{" "}
            {jobs.length === 1 ? "vaga disponível" : "vagas disponíveis"}
          </p>
        </div>

        {jobs.length === 0 ? (
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-8 text-center">
            <p className="text-slate-400">
              Nenhuma vaga disponível no momento. Volte em breve!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <Link
                key={job.id}
                href={`/vagas/${job.slug}`}
                className="block rounded-xl border border-slate-800 bg-slate-900/40 p-6 hover:border-indigo-600 hover:bg-slate-900/60 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold">{job.title}</h2>
                    <p className="mt-1 text-slate-400">{job.company.name}</p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-lg bg-slate-800 px-3 py-1 text-sm">
                        📍 {job.location}
                      </span>
                      <span className="rounded-lg bg-slate-800 px-3 py-1 text-sm">
                        {job.workMode === "REMOTE" && "🏠 Remoto"}
                        {job.workMode === "HYBRID" && "🏢 Híbrido"}
                        {job.workMode === "ONSITE" && "🏢 Presencial"}
                      </span>
                      <span className="rounded-lg bg-slate-800 px-3 py-1 text-sm">
                        {job.seniority === "INTERN" && "🎓 Estágio"}
                        {job.seniority === "JUNIOR" && "🌱 Júnior"}
                        {job.seniority === "MID" && "⚡ Pleno"}
                        {job.seniority === "SENIOR" && "🚀 Sênior"}
                        {job.seniority === "LEAD" && "👑 Lead"}
                      </span>
                    </div>

                    <p className="mt-3 text-sm text-slate-500">
                      {job._count.applications} candidatura(s)
                    </p>
                  </div>

                  <div className="text-indigo-400">→</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
