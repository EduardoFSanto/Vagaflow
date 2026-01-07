import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(2).max(100),
  companyName: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(6),
});

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim();
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validated = registerSchema.parse(body);

    // Verificar se email já existe
    const existingUser = await prisma.user.findUnique({
      where: { email: validated.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email já cadastrado" },
        { status: 400 }
      );
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(validated.password, 10);

    // Criar slug único para a empresa
    let slug = slugify(validated.companyName);
    let slugExists = await prisma.company.findUnique({
      where: { slug },
    });

    let counter = 1;
    while (slugExists) {
      slug = `${slugify(validated.companyName)}-${counter}`;
      slugExists = await prisma.company.findUnique({
        where: { slug },
      });
      counter++;
    }

    // Criar user e company em transação
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: validated.email,
          password: hashedPassword,
          name: validated.name,
        },
      });

      const company = await tx.company.create({
        data: {
          name: validated.companyName,
          slug,
          userId: user.id,
        },
      });

      return { user, company };
    });

    return NextResponse.json(
      {
        message: "Conta criada com sucesso!",
        user: {
          id: result.user.id,
          email: result.user.email,
          name: result.user.name,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Dados inválidos", details: error.issues },
        { status: 400 }
      );
    }

    console.error("Erro no registro:", error);
    return NextResponse.json({ error: "Erro ao criar conta" }, { status: 500 });
  }
}
