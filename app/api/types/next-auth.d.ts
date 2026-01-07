import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      company?: {
        id: number;
        name: string;
        slug: string;
      } | null;
    };
  }

  interface User {
    id: string;
    email: string;
    name?: string | null;
    company?: {
      id: number;
      name: string;
      slug: string;
    } | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    name?: string | null;
    company?: {
      id: number;
      name: string;
      slug: string;
    } | null;
  }
}
