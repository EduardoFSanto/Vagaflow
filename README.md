# 💼 VagaFlow

<div align="center">

![VagaFlow Banner](https://via.placeholder.com/800x200/6366f1/ffffff?text=VagaFlow+-+Job+Application+Platform)

**A modern job application platform connecting talent with opportunities**

[![Next.js](https://img.shields.io/badge/Next.js-15.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.0-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-316192?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

[Demo](https://vagaflow.vercel.app) • [Documentation](#documentation) • [Report Bug](https://github.com/yourusername/vagaflow/issues)

</div>

---

## 📖 About

VagaFlow is a full-stack job application platform that streamlines the recruitment process. Companies can post job openings, manage applications, and track candidates, while job seekers can browse opportunities and apply directly through an intuitive interface.

### ✨ Key Features

#### For Job Seekers
- 🔍 Browse available job listings
- 📝 Apply to positions with custom messages
- 🏷️ Filter by location, work mode, and seniority level
- 📱 Fully responsive mobile experience

#### For Companies
- 📊 Comprehensive dashboard with analytics
- ➕ Create and manage job postings
- 👥 View and manage candidate applications
- 📧 Contact candidates directly via email
- 📈 Track application metrics per position

---

## 🚀 Tech Stack

### Frontend
- **Framework:** Next.js 15.1 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Custom components with Tailwind

### Backend
- **API:** Next.js API Routes
- **Database:** PostgreSQL (Neon)
- **ORM:** Prisma
- **Validation:** Zod

### Deployment
- **Hosting:** Vercel
- **Database:** Neon (PostgreSQL)

---

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL database (or Neon account)

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/vagaflow.git
cd vagaflow
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` with your credentials:
```env
DATABASE_URL="postgresql://user:password@host:5432/database"
```

4. **Run database migrations**
```bash
npx prisma migrate dev
```

5. **Seed the database (optional)**
```bash
npx prisma db seed
```

6. **Start the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗂️ Project Structure

```
vagaflow-app/
├── app/
│   ├── api/                    # API routes
│   │   ├── applications/       # Application endpoints
│   │   └── jobs/              # Job endpoints
│   ├── empresa/               # Company pages
│   │   ├── dashboard/         # Company dashboard
│   │   └── vagas/            # Job management
│   ├── vagas/                # Public job listings
│   │   ├── _components/      # Page-specific components
│   │   └── [slug]/           # Job detail page
│   ├── _components/          # Shared components
│   └── page.tsx              # Homepage
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── seed.ts               # Database seeding
└── public/                   # Static assets
```

---

## 🎨 Features in Detail

### Job Listing System
- Dynamic job pages with SEO-friendly slugs
- Filtering by work mode (Remote, Hybrid, On-site)
- Seniority levels (Intern, Junior, Mid, Senior, Lead)
- Application count tracking

### Application Management
- Candidate information collection
- Message/cover letter support
- Email integration for direct contact
- Application timestamp tracking

### Company Dashboard
- Real-time statistics (total jobs, applications, average per job)
- Job performance metrics
- Quick access to candidate applications

---

## 🔐 Database Schema

```prisma
Company
├── id, name, slug, email, password
└── jobs (1:N)

Job
├── id, title, slug, description
├── location, workMode, seniority
├── companyId (FK)
└── applications (1:N)

Candidate
├── id, name, email
└── applications (1:N)

Application
├── id, message
├── jobId (FK)
└── candidateId (FK)
```

---

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npx prisma studio    # Open Prisma Studio (database GUI)
```

### Environment Variables

Create a `.env` file with:

```env
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

### Database Setup

Use [Neon](https://neon.tech) for free PostgreSQL hosting:
1. Create account and project
2. Copy connection string
3. Add to Vercel environment variables
4. Run migrations: `npx prisma migrate deploy`

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: add some amazing feature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Test updates
- `chore:` Build process or auxiliary tool changes

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Eduardo Farias**

- GitHub: https://github.com/EduardoFSanto
- LinkedIn: (https://www.linkedin.com/in/eduardo-farias-a886b4361)
---

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting
- Neon for PostgreSQL hosting
- Prisma for the excellent ORM

---

<div align="center">

Made with ❤️ by Eduardo Farias

⭐ Star this repo if you find it helpful!

</div>
