// app/page.tsx
import Link from "next/link";

export default async function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <h1 className="text-lg font-semibold tracking-tight">VagaFlow</h1>
          <p className="text-xs text-slate-400">
            Conectando talentos a oportunidades
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10">
        {/* Seção de vagas */}
        <section>
          <h3 className="text-2xl font-semibold">Vagas em Destaque</h3>
          <p className="mt-2 text-sm text-slate-400">
            No momento, não há vagas publicadas. Fique atento para atualizações!
          </p>

          {/* Mock de vaga */}
          <div className="mt-6">
            <div className="border p-6 rounded-xl bg-slate-800">
              <h4 className="text-lg font-semibold text-slate-50">
                Desenvolvedor Front-end
              </h4>
              <p className="text-sm text-slate-400">
                Trabalhe com React, Next.js e outras tecnologias modernas.
              </p>
              <Link href="/vaga/1" className="mt-3 text-indigo-300">
                Ver detalhes
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
