// app/page.tsx

// 1) Importa o cliente do Prisma (que fala com o banco)
import { prisma } from "@/lib/prisma";

// 2) Tipo das vagas que vamos usar na tela
//    (isso é só pro TypeScript saber o formato do objeto "job")
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

// 3) Funções utilitárias só para deixar o JSX mais limpo
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

// 4) Componente da página (roda no servidor)
//    - Busca as vagas no banco
//    - Devolve o HTML para o navegador
export default async function Home() {
  // 🔹 Aqui é a parte "banco de dados"
  const jobs = (await prisma.job.findMany({
    where: { isOpen: true },
    include: { company: true }, // traz os dados da empresa junto
    orderBy: { createdAt: "desc" },
  })) as JobWithCompany[];

  // 🔹 Daqui pra baixo é só layout/HTML (parte visual)
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* NAVBAR */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500 text-xs font-bold">
              VF
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight">VagaFlow</h1>
              <p className="text-xs text-slate-400">
                Plataforma moderna de currículos e vagas
              </p>
            </div>
          </div>

          <button className="rounded-full border border-slate-700 px-4 py-1.5 text-xs font-medium text-slate-200 hover:border-indigo-500 hover:text-white transition">
            Área da empresa
          </button>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="mx-auto max-w-5xl px-4 py-10">
        {/* Hero / texto principal */}
        <section className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">
              Encontre a vaga ideal
            </h2>
            <p className="mt-2 max-w-xl text-sm text-slate-400">
              O VagaFlow organiza currículos e conecta talentos às melhores
              oportunidades. Abaixo você vê as vagas deste ambiente de
              demonstração.
            </p>
          </div>

          <div className="flex gap-2">
            <button className="rounded-full bg-indigo-500 px-4 py-2 text-xs font-semibold text-white shadow hover:bg-indigo-600 transition">
              Sou candidato
            </button>
            <button className="rounded-full border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-100 hover:border-indigo-500 transition">
              Sou empresa
            </button>
          </div>
        </section>

        {/* Lista de vagas */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
              Vagas em destaque
            </h3>
            <span className="text-xs text-slate-500">
              {jobs.length} vaga(s)
            </span>
          </div>

          {jobs.length === 0 ? (
            <p className="text-sm text-slate-500">
              Nenhuma vaga cadastrada ainda. Em breve você poderá criar vagas
              pela área da empresa.
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {jobs.map((job) => (
                <article
                  key={job.id}
                  className="group rounded-xl border border-slate-800 bg-slate-900/40 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-400 hover:shadow-lg"
                >
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <div className="text-xs font-medium text-emerald-400">
                      {job.company.name}
                    </div>

                    <span className="rounded-full bg-slate-800 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-300">
                      {formatSeniority(job.seniority)}
                    </span>
                  </div>

                  <h4 className="mb-2 text-lg font-semibold text-slate-50">
                    {job.title}
                  </h4>

                  <p className="mb-3 line-clamp-3 text-sm text-slate-400">
                    {job.description}
                  </p>

                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>{job.location}</span>
                    <span className="font-medium text-indigo-300">
                      {formatWorkMode(job.workMode)}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
