"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validações
    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          companyName: formData.companyName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao criar conta");
      }

      // Redirecionar para login
      router.push("/auth/login?registered=true");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar conta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 font-bold">
              VF
            </div>
            <span className="text-2xl font-bold">VagaFlow</span>
          </Link>
          <h1 className="text-3xl font-bold mt-6">Criar Conta</h1>
          <p className="text-slate-400 mt-2">
            Cadastre sua empresa e comece a contratar
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
              <label className="block text-sm font-medium mb-2">Seu nome</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full rounded-lg bg-slate-900 p-3 outline-none ring-1 ring-slate-800 focus:ring-indigo-500"
                placeholder="João Silva"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Nome da empresa
              </label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) =>
                  setFormData({ ...formData, companyName: e.target.value })
                }
                className="w-full rounded-lg bg-slate-900 p-3 outline-none ring-1 ring-slate-800 focus:ring-indigo-500"
                placeholder="Empresa LTDA"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full rounded-lg bg-slate-900 p-3 outline-none ring-1 ring-slate-800 focus:ring-indigo-500"
                placeholder="contato@empresa.com"
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
                minLength={6}
              />
              <p className="text-xs text-slate-500 mt-1">Mínimo 6 caracteres</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Confirmar senha
              </label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
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
              {loading ? "Criando conta..." : "Criar conta"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-slate-400">
              Já tem uma conta?{" "}
              <Link
                href="/auth/login"
                className="text-indigo-400 hover:text-indigo-300 font-medium"
              >
                Fazer login
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
