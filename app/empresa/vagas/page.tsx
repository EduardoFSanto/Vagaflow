import Header from "../../_components/Header";
import NewJobForm from "./NewJobForm";

export default function CompanyVagas() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />

      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-3xl font-bold mb-6">Criar nova vaga</h1>
        <NewJobForm />
      </main>
    </div>
  );
}
