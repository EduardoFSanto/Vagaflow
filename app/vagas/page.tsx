export const dynamic = "force-dynamic";
export const revalidate = 0;

import { prisma } from "@/lib/prisma";

export default async function VagasPage() {
  const jobs = await prisma.job.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      company: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
  });

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Vagas disponíveis</h1>

      {jobs.length === 0 && (
        <p className="text-slate-400">Nenhuma vaga publicada.</p>
      )}

      <ul className="space-y-4">
        {jobs.map((job) => (
          <li key={job.id} className="rounded-xl border border-slate-800 p-4">
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="text-slate-400">{job.company.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
