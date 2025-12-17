// app/page.tsx

import Link from "next/link"; // Para navegação entre as páginas
import Header from "./_components/Header"; // Importando corretamente o Header

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <Header /> {/* Usando o Header aqui */}
      {/* Seção principal */}
      <main className="mx-auto max-w-5xl px-6 py-12">
        {/* Hero */}
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

          {/* Mock de vaga */}
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

        {/* Áreas para candidato e empresa */}
        <section className="mt-10 flex justify-between space-x-4">
          <Link
            href="/empresa/vagas"
            className="rounded-lg bg-indigo-500 text-white p-4 text-center w-full max-w-xs hover:bg-indigo-600"
          >
            Área da Empresa
          </Link>
          <Link
            href="/vaga"
            className="rounded-lg bg-indigo-500 text-white p-4 text-center w-full max-w-xs hover:bg-indigo-600"
          >
            Área do Candidato
          </Link>
        </section>
      </main>
    </div>
  );
}
