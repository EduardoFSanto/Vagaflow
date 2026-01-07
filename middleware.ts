// vagaflow-app/middleware.ts

export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/empresa/dashboard/:path*", "/empresa/vagas/:path*"],
};
