// app/vaga/[id]/page.tsx

export default async function JobPage({ params }: { params: { id: string } }) {
  // Mock dos dados da vaga
  const job = {
    title: "Desenvolvedor Front-end",
    company: { name: "TechWave", slug: "techwave" },
    description: "Trabalhe com React, Next.js e outras tecnologias modernas.",
    location: "Remoto",
    workMode: "REMOTO",
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
          <h1 className="text-2xl font-semibold tracking-tight">{job.title}</h1>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12">
        <section className="rounded-xl border border-gray-700 bg-gray-800 p-6 shadow-xl">
          <div className="mb-3">
            <h3 className="text-lg font-semibold text-white">
              {job.company.name}
            </h3>
            <p className="text-sm text-gray-400">{job.company.slug}</p>
          </div>

          <p className="text-sm text-gray-400">{job.description}</p>
          <div className="mt-4 text-sm text-gray-500">
            Localização: {job.location}
          </div>
          <div className="text-sm text-gray-500">
            Modalidade: {job.workMode}
          </div>
        </section>
      </main>
    </div>
  );
}
