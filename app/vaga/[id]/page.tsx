// app/vaga/[id]/page.tsx

export default async function JobPage({ params }: { params: { id: string } }) {
  // Aqui, podemos usar dados estáticos ou mockados

  const job = {
    title: "Desenvolvedor Front-end",
    company: { name: "TechWave", slug: "techwave" },
    description: "Trabalhe com React, Next.js e outras tecnologias modernas.",
    location: "Remoto",
    workMode: "REMOTO",
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <h1 className="text-lg font-semibold tracking-tight">{job.title}</h1>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10">
        <section className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
          <div className="mb-3">
            <h3 className="text-lg font-semibold text-slate-50">
              {job.company.name}
            </h3>
            <p className="text-sm text-slate-400">{job.company.slug}</p>
          </div>
          <p className="mb-4 text-sm text-slate-400">{job.description}</p>
          <div className="text-sm text-slate-500">{job.location}</div>
          <div className="text-sm text-slate-500">
            Modalidade: {job.workMode}
          </div>
        </section>
      </main>
    </div>
  );
}
