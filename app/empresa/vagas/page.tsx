// app/empresa/vagas/page.tsx
import { prisma } from "@/lib/prisma"; // Ajuste a importação do prisma
import Link from "next/link";

export default async function CompanyVagas() {
  // Buscar as vagas da empresa (onde 'companyId' é o ID da empresa)
  const jobs = await prisma.job.findMany({
    where: { companyId: 1 }, // Exemplo: usar o companyId correto da empresa
    include: { company: true },
  });

  return (
    <div>
      <h1>Minhas Vagas</h1>
      <ul>
        {jobs.map((job) => (
          <li key={job.id}>
            <h2>{job.title}</h2>
            <p>{job.description}</p>
            {/* Aqui você pode colocar os botões de editar e excluir */}
            <Link href={`/empresa/vaga/edit/${job.id}`}>Editar vaga</Link>
            <button>Excluir vaga</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
