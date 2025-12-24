"use client";

import { useState } from "react";

export default function CandidateForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFeedback(null);

    // Por enquanto: só simula envio (depois a gente liga no banco)
    setFeedback("Dados enviados! ✅ Em breve vamos salvar no banco.");
    setName("");
    setEmail("");
    setLinkedin("");
    setMessage("");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        className="w-full rounded-lg bg-slate-900 p-3 outline-none ring-1 ring-slate-800 focus:ring-indigo-500"
        placeholder="Nome completo"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        className="w-full rounded-lg bg-slate-900 p-3 outline-none ring-1 ring-slate-800 focus:ring-indigo-500"
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        className="w-full rounded-lg bg-slate-900 p-3 outline-none ring-1 ring-slate-800 focus:ring-indigo-500"
        placeholder="LinkedIn (opcional)"
        value={linkedin}
        onChange={(e) => setLinkedin(e.target.value)}
      />

      <textarea
        className="w-full min-h-[120px] rounded-lg bg-slate-900 p-3 outline-none ring-1 ring-slate-800 focus:ring-indigo-500"
        placeholder="Mensagem / resumo (opcional)"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        type="submit"
        className="w-full rounded-lg bg-indigo-600 px-6 py-3 font-semibold hover:bg-indigo-500"
      >
        Enviar
      </button>

      {feedback && <p className="text-sm text-emerald-400">{feedback}</p>}
    </form>
  );
}
