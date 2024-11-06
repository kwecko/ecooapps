import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PAGES_IN_CONSTRUCTION = process.env.PAGES_IN_CONSTRUCTION?.split(",") || [];

const PROTECTED_PAGES = [
  "",
  "/ofertas",
  "/relatorios",
  "/entregas",
  "/enviar-sacola",
  "/montar-sacola",
  "/informacoes-ciclo",
  "/sucesso",
];

export const config = {
  matcher: [
    ...PROTECTED_PAGES.map(page => `${page}/:path*`),
    ...PAGES_IN_CONSTRUCTION.map(page => `${page}/:path*`),
  ],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const access_token = request.cookies.get("cdd_token")?.value;

  const pathnameStartsWith = (startsWith: string[]) =>
    startsWith.some((item) => {
      if (pathname.startsWith(item)) return true;
    });

  if ((pathname === "/" || PROTECTED_PAGES.includes(pathname)) && !access_token) {
    return NextResponse.redirect(new URL("/inicio", request.url));
  }
  
  if (PAGES_IN_CONSTRUCTION.includes(pathname)) {
    return NextResponse.redirect(new URL("/em-construcao", request.url));
  }

  return NextResponse.next();
}
