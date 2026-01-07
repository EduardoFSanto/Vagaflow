"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
        return;
      }

      router.push("/empresa/dashboard");
      router.refresh();
    } catch (err) {
      setError("Erro ao fazer login. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 font-bold">
              VF
            </div>
            <span className="text-2xl font-bold">VagaFlow</span>
          </Link>
          <h1 className="text-3xl font-bold mt-6">Área da Empresa</h1>
          <p className="text-slate-400 mt-2">
            Faça login para gerenciar suas vagas
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-8">
          {error && (
            <div className="mb-4 rounded-lg bg-red-900/30 border border-red-700 p-4">
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full rounded-lg bg-slate-900 p-3 outline-none ring-1 ring-slate-800 focus:ring-indigo-500"
                placeholder="empresa@email.com"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Senha</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full rounded-lg bg-slate-900 p-3 outline-none ring-1 ring-slate-800 focus:ring-indigo-500"
                placeholder="••••••••"
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-indigo-600 px-6 py-3 font-semibold hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-slate-400">
              Não tem uma conta?{" "}
              <Link
                href="/auth/register"
                className="text-indigo-400 hover:text-indigo-300 font-medium"
              >
                Criar conta
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-slate-500">
          <Link href="/" className="hover:text-slate-400">
            ← Voltar para home
          </Link>
        </div>
      </div>
    </div>
  );
}
