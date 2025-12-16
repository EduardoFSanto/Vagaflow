"use client";

import { useState } from "react";

type Props = { jobId: number };

export default function CandidateForm({ jobId }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState(""); // 👈 aqui está o "linkedin" certo
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId, name, email, linkedinUrl }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setFeedback(data?.error ?? "Não foi possível enviar a candidatura.");
        return;
      }

      setFeedback("Candidatura enviada com sucesso!");
      setName("");
      setEmail("");
      setLinkedinUrl("");
    } catch {
      setFeedback("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 space-y-4 rounded-xl border border-slate-800 bg-slate-900/40 p-4"
    >
      <div>
        <label className="block text-xs font-medium text-slate-300">Nome</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950/40 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500"
          placeholder="Seu nome"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-300">
          E-mail
        </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
          className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950/40 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500"
          placeholder="seuemail@exemplo.com"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-300">
          LinkedIn / Portfólio (opcional)
        </label>
        <input
          value={linkedinUrl}
          onChange={(e) => setLinkedinUrl(e.target.value)}
          className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950/40 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500"
          placeholder="https://www.linkedin.com/in/..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Enviando..." : "Enviar candidatura"}
      </button>

      {feedback && <p className="text-xs text-slate-300">{feedback}</p>}
    </form>
  );
}
