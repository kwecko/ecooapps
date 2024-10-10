import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_PAGES = [
  "",
  "/ofertas",
  "/relatorios",
  "/entregas",
  "/enviar-sacola",
  "/montar-sacola",
  "/informacoes-ciclo",
  "/successo",
];

const PAGES_IN_CONSTRUCTION =
  process.env.PAGES_IN_CONSTRUCTION?.split(",") || [];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const access_token = request.cookies.get("token")?.value;

  const pathnameStartsWith = (startsWith: string[]) =>
    startsWith.some((item) => {
      if (pathname.startsWith(item)) return true;
    });

  if (
    (pathname === "/" || pathnameStartsWith(PROTECTED_PAGES)) &&
    !access_token
  ) {
    return NextResponse.redirect(new URL("/inicio", request.url));
  }

  if (PAGES_IN_CONSTRUCTION.includes(pathname)) {
    return NextResponse.redirect(new URL("/em-construcao", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/ofertas/:path*",
    "/entregas/:path*",
    "/enviar-sacola/:path*",
    "/montar-sacola/:path*",
    "/relatorios/:path*",
    "/informacoes-ciclo/:path*",
    "/successo/:path*",
  ],
};
