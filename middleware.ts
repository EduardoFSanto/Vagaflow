import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAuthPage = request.nextUrl.pathname.startsWith("/auth");
  const isProtectedRoute =
    request.nextUrl.pathname.startsWith("/empresa/dashboard") ||
    request.nextUrl.pathname.startsWith("/empresa/vagas");

  // Se está tentando acessar página de auth e já está logado, redireciona
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/empresa/dashboard", request.url));
  }

  // Se está tentando acessar rota protegida sem estar logado, redireciona
  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/empresa/dashboard/:path*",
    "/empresa/vagas/:path*",
    "/auth/:path*",
  ],
};
