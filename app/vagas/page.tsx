import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function VagasPage() {
  const jobs = await prisma.job.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      company: {
        select: { name: true, slug: true },
      },
    },
  });

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Vagas disponíveis</h1>

      <ul className="space-y-4">
        {jobs.map((job) => (
          <li
            key={job.id}
            className="border border-slate-800 rounded-xl p-4 hover:bg-slate-900"
          >
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="text-slate-400">{job.company.name}</p>

            <Link
              href={`/vagas/${job.slug}`}
              className="text-indigo-400 hover:underline mt-2 inline-block"
            >
              Ver vaga →
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
