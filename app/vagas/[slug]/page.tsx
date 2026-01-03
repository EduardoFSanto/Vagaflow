import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function JobPage({ params }: Props) {
  const { slug } = await params;

  if (!slug) {
    notFound();
  }

  const job = await prisma.job.findUnique({
    where: { slug },
    include: {
      company: true,
    },
  });

  if (!job) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold">{job.title}</h1>

      <p className="mt-2 text-slate-500">{job.company.name}</p>

      <div className="mt-6 text-slate-700 whitespace-pre-line">
        {job.description}
      </div>
    </main>
  );
}
