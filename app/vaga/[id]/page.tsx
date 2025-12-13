import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

type JobWithCompany = {
  id: number;
  title: string;
  description: string;
  location: string;
  workMode: "REMOTO" | "HIBRIDO" | "PRESENCIAL";
  seniority: "JUNIOR" | "PLENO" | "SENIOR";
  company: {
    id: number;
    name: string;
    slug: string;
  };
};

function formatWorkMode(mode: JobWithCompany["workMode"]) {
  if (mode === "REMOTO") return "Remoto";
  if (mode === "HIBRIDO") return "Híbrido";
  return "Presencial";
}

function formatSeniority(level: JobWithCompany["seniority"]) {
  if (level === "JUNIOR") return "Júnior";
  if (level === "PLENO") return "Pleno";
  return "Sênior";
}

interface JobPageProps {
  params: { id: string };
}

export default async function JobPage({ params }: JobPageProps) {
  const jobId = Number(params.id);

  if (Number.isNaN(jobId)) {
    notFound();
  }

  const job = await prisma.job.findUnique({
    where: { id: jobId },
    include: { company: true },
  });

  if (!job) {
    notFound();
  }

  const data = job as JobWithCompany;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Navbar simples reaproveitada */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500 text-xs font-bold">
              VF
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight">VagaFlow</h1>
              <p className="text-xs text-slate-400">Voltar para as vagas</p>
            </div>
          </Link>

          <span className="rounded-full border border-slate-700 px-4 py-1.5 text-xs font-medium text-slate-200">
            Detalhes da vaga
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10 space-y-6 md:space-y-8">
        {/* Card principal da vaga */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 shadow-lg">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-medium text-emerald-400">
                {data.company.name}
              </p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight">
                {data.title}
              </h2>
            </div>

            <div className="flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-slate-800 px-3 py-1 font-semibold uppercase tracking-wide text-slate-200">
                {formatSeniority(data.seniority)}
              </span>
              <span className="rounded-full bg-slate-800 px-3 py-1 font-medium text-indigo-300">
                {formatWorkMode(data.workMode)}
              </span>
              <span className="rounded-full bg-slate-800 px-3 py-1 text-slate-300">
                {data.location}
              </span>
            </div>
          </div>

          <div className="space-y-3 text-sm text-slate-300">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
              Sobre a vaga
            </h3>
            <p className="leading-relaxed">{data.description}</p>
          </div>
        </section>

        {/* Seção de candidatura (por enquanto só visual) */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
          <h3 className="mb-2 text-lg font-semibold">Candidatar-se</h3>
          <p className="mb-4 text-sm text-slate-400">
            Em breve, este formulário vai enviar seus dados para o VagaFlow e
            registrar sua candidatura diretamente no banco de dados.
          </p>

          <form className="grid gap-3 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-1 block text-xs font-medium text-slate-300">
                Nome completo
              </label>
              <input
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-indigo-400"
                placeholder="Seu nome"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-300">
                E-mail
              </label>
              <input
                type="email"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-indigo-400"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-300">
                Cidade
              </label>
              <input
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-indigo-400"
                placeholder="Ex: São Paulo - SP"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-xs font-medium text-slate-300">
                Link do currículo (LinkedIn, PDF, portfólio, etc.)
              </label>
              <input
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-indigo-400"
                placeholder="https://..."
              />
            </div>

            <div className="md:col-span-2 mt-2">
              <button
                type="button"
                className="w-full rounded-lg bg-indigo-500 py-2 text-sm font-semibold text-white hover:bg-indigo-600 transition"
              >
                Enviar candidatura (em breve)
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
