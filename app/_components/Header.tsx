import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 font-bold">
            VF
          </div>
          <div>
            <p className="font-semibold">VagaFlow</p>
            <p className="text-xs text-slate-400">
              Conectando talentos às oportunidades
            </p>
          </div>
        </div>

        <Link
          href="/empresa/vagas"
          className="rounded-lg border border-slate-700 px-4 py-2 text-sm hover:border-indigo-500"
        >
          Área da empresa
        </Link>
      </div>
    </header>
  );
}
