// app/vagas/page.tsx
import Link from "next/link";

async function getJobs() {
  const res = await fetch("http://localhost:3000/api/jobs", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar vagas");
  }

  return res.json();
}

export default async function VagasPage() {
  const { jobs } = await getJobs();

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Vagas disponíveis</h1>

      {jobs.length === 0 && (
        <p className="text-slate-400">Nenhuma vaga disponível no momento.</p>
      )}

      <ul className="space-y-4">
        {jobs.map((job: any) => (
          <li
            key={job.id}
            className="rounded-xl border border-slate-800 bg-slate-900 p-4"
          >
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="text-slate-400 mt-1">{job.company?.name}</p>

            <Link
              href={`/vagas/${job.slug}`}
              className="inline-block mt-3 text-indigo-400 hover:underline"
            >
              Ver vaga →
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
