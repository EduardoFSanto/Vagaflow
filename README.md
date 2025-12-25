
# Vagaflow

Vagaflow é uma aplicação web que conecta candidatos e empresas, permitindo cadastrar e visualizar vagas de forma simples, moderna e responsiva.

## Demonstração

- Aplicação em produção: https://vagaflow.vercel.app/

## Tecnologias Utilizadas

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Prisma ORM
- SQLite (arquivo `dev.db`)
- Deploy na Vercel

## Funcionalidades

- Página inicial apresentando a proposta do Vagaflow.
- Call-to-actions separados para candidatos e empresas.
- Área da empresa para criar novas vagas.
- Layout responsivo com estilização via Tailwind CSS.
- Camada de persistência utilizando Prisma + SQLite.

## Modelo de Dados (Prisma)

datasource db {
provider = "sqlite"
url = "file:./dev.db"
}

generator client {
provider = "prisma-client-js"
}

model Company {
id Int @id @default(autoincrement())
name String
slug String @unique
email String @unique
password String
createdAt DateTime @default(now())
jobs Job[]
}


> Próximos passos naturais: definir o modelo `Job` (vaga) e relacionar com `Company` (1:N).

## Fluxo de Navegação

### `/` – Home

- Apresenta o Vagaflow e explica que conecta talentos a empresas.
- Seção principal com título do tipo “Encontre a vaga ideal”.
- Botão “Quero me candidatar” apontando para `/vaga`.
- Seção de destaque para empresas informando que ainda não há vagas publicadas e que elas podem criar vagas na área da empresa.

### `/empresa/vagas` – Área da empresa

- Página voltada para empresas, com título “Criar nova vaga”.
- Usa o layout global (header compartilhado).
- Renderiza o componente `NewJobForm`, responsável pelo formulário de criação de vaga.
- Estilização com Tailwind (`min-h-screen bg-slate-950 text-white`, containers centralizados etc.).

### `/vaga` – Área do candidato

- Página destinada a candidatos (estrutura exata pode ser ajustada conforme evolução do projeto).
- Pode listar vagas disponíveis e permitir visualizar detalhes de cada uma.

## Estrutura de Pastas (resumo)

vagaflow-app/
app/
page.tsx # Home
layout.tsx # Layout principal
empresa/
vagas/
page.tsx # Área de criação de vagas para empresas
vaga/
page.tsx # Página de vagas para candidatos
prisma/
migrations/ # Migrações do Prisma (se houver)
schema.prisma # Modelo de dados
seed.ts # Script de seed (se utilizado)
public/
favicon.ico
styles/
globals.css # Estilos globais / Tailwind
dev.db # Banco de dados SQLite local
.env # Variáveis de ambiente
next.config.ts
tsconfig.json
package.json
package-lock.json

text

## Como Rodar o Projeto Localmente

1. Clonar o repositório
git clone https://github.com/SEU-USUARIO/vagaflow.git
cd vagaflow/vagaflow-app

2. Instalar dependências
npm install

3. Configurar variáveis de ambiente
Crie um arquivo .env na raiz de vagaflow-app e defina:
DATABASE_URL="file:./dev.db"
4. Rodar as migrações do Prisma (se existirem)
npx prisma migrate dev

5. Rodar o servidor de desenvolvimento
npm run dev

text

A aplicação ficará disponível em `http://localhost:3000`.

## Scripts Disponíveis

- `npm run dev` – Inicia o servidor de desenvolvimento (Next.js).
- `npm run build` – Gera o build de produção (`next build`).
- `npm start` – Roda a aplicação em modo de produção (`next start`).
- `npm run lint` – Executa o linter configurado (ESLint).

## Deploy

O deploy é realizado na Vercel.  
A cada push na branch configurada (por exemplo, `main`):

1. As dependências são instaladas (`npm install`).
2. O build de produção é gerado (`npm run build`).
3. A aplicação é publicada automaticamente em um ambiente escalável.

## Próximos Passos

- Definir o modelo `Job` no Prisma e relacionar com `Company`.
- Implementar listagem de vagas para candidatos na rota `/vaga`.
- Criar página de detalhes de vaga (ex.: `/vaga/[id]`).
- Adicionar autenticação simples para empresas (login/logout).
- Escrever testes básicos (unitários e de integração) para componentes e rotas principais.
