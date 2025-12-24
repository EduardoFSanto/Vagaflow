import Link from "next/link";
import Header from "./_components/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />

      <main className="mx-auto max-w-5xl px-6 py-16 space-y-16">
        {/* Hero */}
        <section>
          <h2 className="text-4xl font-bold">Encontre a vaga ideal</h2>
          <p className="mt-4 text-slate-400 max-w-2xl">
            O VagaFlow conecta talentos às empresas. Se você é candidato, envie
            seu currículo. Se é empresa, publique vagas em poucos passos.
          </p>

          <div className="mt-8">
            <Link
              href="/vaga"
              className="inline-flex items-center rounded-xl bg-indigo-600 px-6 py-3 font-semibold hover:bg-indigo-500"
            >
              Quero me candidatar
            </Link>
          </div>
        </section>

        {/* Destaque */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
          <h3 className="text-xl font-semibold">Vagas em destaque</h3>
          <p className="mt-2 text-slate-400">
            No momento não há vagas publicadas. Empresas podem criar vagas na
            área da empresa.
          </p>
        </section>
      </main>
    </div>
  );
}
