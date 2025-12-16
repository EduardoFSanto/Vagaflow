// app/empresa/vagas/page.tsx

import { prisma } from "@/lib/prisma";

export default async function CompanyVagas() {
  const jobs = await prisma.job.findMany({
    where: { companyId: 1 }, // Exemplo: pegar todas as vagas de uma empresa (companyId = 1)
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
            <button>Editar vaga</button>
            <button>Excluir vaga</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
