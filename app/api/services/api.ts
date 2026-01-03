// app/services/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export const jobsApi = {
  async submitApplication(data: {
    jobId: number;
    name: string;
    email: string;
    message?: string;
  }) {
    const response = await fetch(`${API_URL}/applications/route`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Erro ao enviar candidatura");
    }

    return response.json();
  },

  // Adicione outros métodos conforme necessário
};
