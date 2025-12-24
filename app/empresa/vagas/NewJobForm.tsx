"use client";

import { useState } from "react";

export default function NewJobForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });

    alert("Vaga criada com sucesso!");
    setTitle("");
    setDescription("");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        className="w-full rounded-lg bg-slate-900 p-3"
        placeholder="Título da vaga"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="w-full rounded-lg bg-slate-900 p-3"
        placeholder="Descrição da vaga"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold">
        Publicar vaga
      </button>
    </form>
  );
}
