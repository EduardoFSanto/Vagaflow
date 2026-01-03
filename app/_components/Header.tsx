import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 font-bold">
              VF
            </div>
            <div>
              <div className="text-lg font-bold">VagaFlow</div>
              <div className="text-xs text-slate-400">
                Conectando talentos às oportunidades
              </div>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            <Link
              href="/vagas"
              className="text-slate-300 hover:text-white transition-colors"
            >
              Vagas
            </Link>
            <Link
              href="/empresa/dashboard"
              className="text-slate-300 hover:text-white transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/empresa/vagas"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold hover:bg-indigo-500 transition-all"
            >
              Área da empresa
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
