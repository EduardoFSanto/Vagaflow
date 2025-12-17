// app/_components/Header.tsx

export default function Header() {
  return (
    <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500 text-lg font-bold text-white">
            VF
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">VagaFlow</h1>
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
  );
}
