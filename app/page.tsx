// app/page.tsx

import Link from "next/link";

export default async function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500 text-lg font-bold text-white">
              VF
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">
                VagaFlow
              </h1>
              <p className="text-sm text-gray-400">
                Conectando talentos às melhores oportunidades
              </p>
            </div>
          </div>
          <button className="rounded-full border border-gray-700 px-4 py-2 text-xs font-semibold text-gray-200 hover:border-indigo-500 hover:text-white transition">
            Área da empresa
          </button>
        </div>
      </header>

      {/* Main Section */}
      <main className="mx-auto max-w-5xl px-6 py-12">
        <section className="mb-10">
          <h2 className="text-3xl font-semibold">Encontre a vaga ideal</h2>
          <p className="mt-2 text-sm text-gray-400">
            O VagaFlow organiza currículos e conecta talentos às melhores
            oportunidades. Abaixo você vê as vagas deste ambiente de
            demonstração.
          </p>
        </section>

        {/* Vagas em Destaque */}
        <section>
          <h3 className="text-2xl font-semibold mb-4">Vagas em Destaque</h3>
          <p className="text-sm text-gray-500">
            No momento, não há vagas publicadas. Fique atento para as
            atualizações!
          </p>

          {/* Mock vaga */}
          <div className="mt-6 rounded-lg border border-gray-700 bg-gray-800 p-6 shadow-xl">
            <h4 className="text-xl font-semibold text-white">
              Desenvolvedor Front-End
            </h4>
            <p className="text-sm text-gray-400">
              Trabalhe com React, Next.js e outras tecnologias modernas.
            </p>
            <Link
              href="/vaga/1"
              className="mt-4 inline-block text-indigo-400 hover:text-indigo-200"
            >
              Ver detalhes
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
