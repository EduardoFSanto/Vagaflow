import { notFound } from "next/navigation";
import Header from "../../_components/Header";
import CandidateForm from "../_components/CandidateForm";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getJob(slug: string) {
  return await prisma.job.findUnique({
    where: { slug },
    include: {
      company: {
        select: { name: true, slug: true },
      },
    },
  });
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>; // 👈 MUDOU: agora é Promise
}) {
  const { slug } = await params; // 👈 MUDOU: await params primeiro
  const job = await getJob(slug);

  if (!job) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />

      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Coluna Principal */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-4xl font-bold">{job.title}</h1>
              <p className="mt-2 text-xl text-slate-400">{job.company.name}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-lg bg-slate-800 px-4 py-2">
                  📍 {job.location}
                </span>
                <span className="rounded-lg bg-slate-800 px-4 py-2">
                  {job.workMode === "REMOTE" && "🏠 Remoto"}
                  {job.workMode === "HYBRID" && "🏢 Híbrido"}
                  {job.workMode === "ONSITE" && "🏢 Presencial"}
                </span>
                <span className="rounded-lg bg-slate-800 px-4 py-2">
                  {job.seniority === "INTERN" && "🎓 Estágio"}
                  {job.seniority === "JUNIOR" && "🌱 Júnior"}
                  {job.seniority === "MID" && "⚡ Pleno"}
                  {job.seniority === "SENIOR" && "🚀 Sênior"}
                  {job.seniority === "LEAD" && "👑 Lead"}
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
              <h2 className="text-xl font-semibold mb-4">Descrição da vaga</h2>
              <div className="prose prose-invert max-w-none">
                <p className="whitespace-pre-wrap text-slate-300">
                  {job.description}
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar - Formulário */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 rounded-xl border border-slate-800 bg-slate-900/40 p-6">
              <h2 className="text-xl font-semibold mb-4">Candidate-se</h2>
              <CandidateForm jobId={job.id} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
