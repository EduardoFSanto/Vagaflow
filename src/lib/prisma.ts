// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";

// usamos uma variável global pra evitar criar vários clientes em dev
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// 👇 ESTE export é o que resolve o erro
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
