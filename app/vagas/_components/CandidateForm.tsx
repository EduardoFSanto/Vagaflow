"use client";

import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  linkedin: string;
  message: string;
}

export default function CandidateForm({ jobId }: { jobId?: number }) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    linkedin: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("/api/applications/route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId: jobId || 1,
          name: formData.name,
          email: formData.email,
          message:
            formData.message +
            (formData.linkedin ? `\n\nLinkedIn: ${formData.linkedin}` : ""),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao enviar candidatura");
      }

      setSuccess(true);
      setFormData({ name: "", email: "", linkedin: "", message: "" });

      setTimeout(() => {
        window.location.href = "/vagas";
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="rounded-lg bg-emerald-900/30 border border-emerald-700 p-6 text-center">
        <div className="text-4xl mb-3">✅</div>
        <h3 className="text-xl font-semibold text-emerald-400">
          Candidatura enviada!
        </h3>
        <p className="mt-2 text-slate-300">
          Entraremos em contato em breve. Redirecionando...
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-lg bg-red-900/30 border border-red-700 p-4">
          <p className="text-sm text-red-300">❌ {error}</p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-2">
          Nome completo *
        </label>
        <input
          name="name"
          className="w-full rounded-lg bg-slate-900 p-3 outline-none ring-1 ring-slate-800 focus:ring-indigo-500"
          placeholder="João Silva"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={loading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Email *</label>
        <input
          name="email"
          type="email"
          className="w-full rounded-lg bg-slate-900 p-3 outline-none ring-1 ring-slate-800 focus:ring-indigo-500"
          placeholder="joao@email.com"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={loading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">LinkedIn</label>
        <input
          name="linkedin"
          className="w-full rounded-lg bg-slate-900 p-3 outline-none ring-1 ring-slate-800 focus:ring-indigo-500"
          placeholder="linkedin.com/in/joaosilva"
          value={formData.linkedin}
          onChange={handleChange}
          disabled={loading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Por que você é ideal para esta vaga?
        </label>
        <textarea
          name="message"
          className="w-full min-h-[120px] rounded-lg bg-slate-900 p-3 outline-none ring-1 ring-slate-800 focus:ring-indigo-500"
          placeholder="Conte um pouco sobre sua experiência..."
          value={formData.message}
          onChange={handleChange}
          disabled={loading}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-indigo-600 px-6 py-3 font-semibold hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {loading ? "Enviando..." : "Enviar candidatura"}
      </button>
    </form>
  );
}
