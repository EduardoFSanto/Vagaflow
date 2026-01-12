import { PrismaClient, WorkMode, Seniority } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 1️⃣ Criar empresa fake se não existir
  const company = await prisma.company.upsert({
    where: { slug: "empresa-demo" },
    update: {},
    create: {
      name: "Empresa Demo",
      slug: "empresa-demo",
      user: {
        create: {
          email: "demo@vagaflow.com",
          password: "fake-password",
          name: "Empresa Demo",
        },
      },
    },
  });

  // 2️⃣ Criar vagas fake (sem deletar as existentes)
  const seedJobs = [
    {
      title: "Frontend React Júnior",
      slug: "frontend-react-junior",
      description: "Trabalhe com React, Next.js e Tailwind.",
      location: "Remoto",
      workMode: WorkMode.REMOTE,
      seniority: Seniority.JUNIOR,
      companyId: company.id,
    },
    {
      title: "Backend Node.js",
      slug: "backend-node",
      description: "APIs, Prisma e PostgreSQL.",
      location: "São Paulo",
      workMode: WorkMode.HYBRID,
      seniority: Seniority.MID,
      companyId: company.id,
    },
    {
      title: "Full Stack",
      slug: "fullstack",
      description: "Next.js, Node, PostgreSQL.",
      location: "Remoto",
      workMode: WorkMode.REMOTE,
      seniority: Seniority.JUNIOR,
      companyId: company.id,
    },
    {
      title: "Senior Full Stack Engineer",
      slug: "senior-fullstack",
      description: "Líder técnico para arquitetar soluções escaláveis.",
      location: "São Paulo",
      workMode: WorkMode.ONSITE,
      seniority: Seniority.SENIOR,
      companyId: company.id,
    },
    {
      title: "DevOps Engineer",
      slug: "devops-engineer",
      description: "Gerenciar infraestrutura em cloud e CI/CD pipelines.",
      location: "Rio de Janeiro",
      workMode: WorkMode.HYBRID,
      seniority: Seniority.MID,
      companyId: company.id,
    },
  ];

  let createdCount = 0;
  for (const job of seedJobs) {
    const existing = await prisma.job.findUnique({
      where: { slug: job.slug },
    });

    if (!existing) {
      await prisma.job.create({ data: job });
      createdCount++;
    }
  }

  console.log(`✅ ${createdCount} vagas criadas com sucesso! (as existentes foram mantidas)`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
