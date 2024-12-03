import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PAGES_IN_CONSTRUCTION = process.env.PAGES_IN_CONSTRUCTION?.split(",") || [];

const PROTECTED_PAGES = [
  "/",
  "/notificar",
  "/pedidos",
  "/produtores",
  "/produtos",
  "/relatorios",
  "/configuracoes",
];

export const config = {
  matcher: [
    ...PROTECTED_PAGES.map(page => `${page}/:path*`),
    ...PAGES_IN_CONSTRUCTION.map(page => `${page}/:path*`),
  ],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const access_token = request.cookies.get("admin_token")?.value;

  if ((PROTECTED_PAGES.includes(pathname)) && !access_token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (PAGES_IN_CONSTRUCTION.includes(pathname)) {
    return NextResponse.redirect(new URL("/em-construcao", request.url));
  }

  return NextResponse.next();
}
