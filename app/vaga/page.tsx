import Header from "../_components/Header";
import CandidateForm from "./CandidateForm";

export default function VagaPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />

      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-3xl font-bold">Envie seu currículo</h1>
        <p className="mt-3 text-slate-400">
          Preencha seus dados. Assim que surgir uma oportunidade compatível,
          entraremos em contato.
        </p>

        <div className="mt-8">
          <CandidateForm />
        </div>
      </main>
    </div>
  );
}
