import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "../../../../_components/Header";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getJobWithApplications(slug: string) {
  return await prisma.job.findUnique({
    where: { slug },
    include: {
      company: { select: { name: true } },
      applications: {
        orderBy: { createdAt: "desc" },
        include: {
          candidate: { select: { id: true, name: true, email: true } },
        },
      },
    },
  });
}

export default async function JobCandidatesPage({
  params,
}: {
  params: Promise<{ slug: string }>; // 👈 Promise no Next.js 15+
}) {
  const { slug } = await params; // 👈 await params
  const job = await getJobWithApplications(slug);

  if (!job) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />

      <main className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-8">
          <Link
            href="/empresa/dashboard"
            className="text-indigo-400 hover:text-indigo-300 mb-4 inline-block"
          >
            ← Voltar ao dashboard
          </Link>

          <h1 className="text-4xl font-bold mt-2">{job.title}</h1>
          <p className="mt-2 text-slate-400">
            {job.applications.length} candidatura(s) recebida(s)
          </p>
        </div>

        {job.applications.length === 0 ? (
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-8 text-center">
            <p className="text-slate-400">
              Nenhuma candidatura recebida ainda.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {job.applications.map((app) => (
              <div
                key={app.id}
                className="rounded-xl border border-slate-800 bg-slate-900/40 p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">
                      {app.candidate.name}
                    </h3>

                    <a
                      href={`mailto:${app.candidate.email}`}
                      className="mt-1 text-indigo-400 hover:text-indigo-300 inline-block"
                    >
                      {app.candidate.email}
                    </a>

                    {app.message && (
                      <div className="mt-4 rounded-lg bg-slate-800/50 p-4">
                        <p className="text-sm font-medium text-slate-400 mb-2">
                          Mensagem:
                        </p>
                        <p className="text-slate-300 whitespace-pre-wrap">
                          {app.message}
                        </p>
                      </div>
                    )}

                    <p className="mt-3 text-sm text-slate-500">
                      Enviado em{" "}
                      {new Date(app.createdAt).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <a
                      href={`mailto:${app.candidate.email}?subject=Vaga: ${job.title}`}
                      className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold hover:bg-indigo-500 text-center whitespace-nowrap"
                    >
                      📧 Entrar em contato
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
