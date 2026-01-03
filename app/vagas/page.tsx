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
    <div className="max-w-5xl mx-auto px-6 py-12 text-white">
      <h1 className="text-3xl font-bold mb-8">Vagas disponíveis</h1>

      <div className="space-y-4">
        {jobs.map((job) => (
          <Link
            key={job.id}
            href={`/vagas/${job.slug}`}
            className="block rounded-xl border border-slate-800 p-5 hover:bg-slate-900"
          >
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="text-slate-400">{job.company.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
