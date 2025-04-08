import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { steps } from "./app/cadastrar/data";

const PAGES_IN_CONSTRUCTION =
  process.env.PAGES_IN_CONSTRUCTION?.split(",") || [];

const PROTECTED_PAGES = [
  "/",
  "/oferta",
  "/relatorios",
  "/cadastrar/4",
  "/informacoes-ciclo",
  "/negocio",
  "/perfil",
  "/sobre",
  "/configuracoes",
  "/perfil/pessoal",
  "/perfil/comercial",
  "/sobre",
  "/termos"
];

export const config = {
  matcher: [
    ...PROTECTED_PAGES.map((page) => `${page}/:path*`),
    ...PAGES_IN_CONSTRUCTION.map((page) => `${page}/:path*`),
  ],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const farmStatus = request.cookies.get("farm_status")?.value;
  const access_token = request.cookies.get("producer_token")?.value;

  if (pathname.startsWith("/cadastrar")) {
    const currentStep = pathname.split("/").pop();

    if (currentStep && !steps.includes(parseInt(currentStep))) {
      return NextResponse.redirect(new URL("/cadastrar/1", request.url));
    }
  }

  if (PROTECTED_PAGES.includes(pathname) && !access_token) {
    return NextResponse.redirect(new URL("/inicio", request.url));
  }

  if (
    access_token &&
    !farmStatus &&
    pathname !== "/cadastrar/4" &&
    PROTECTED_PAGES.includes(pathname)
  ) {
    return NextResponse.redirect(new URL("/cadastrar/4", request.url));
  }

  if (PROTECTED_PAGES.includes(pathname) && farmStatus === "PENDING") {
    return NextResponse.redirect(
      new URL("/negocio/aguardando-aprovacao", request.url)
    );
  }

  if (PROTECTED_PAGES.includes(pathname) && farmStatus === "INACTIVE") {
    return NextResponse.redirect(
      new URL("/negocio/perfil-rejeitado", request.url)
    );
  }

  if (PAGES_IN_CONSTRUCTION.includes(pathname)) {
    return NextResponse.redirect(new URL("/em-construcao", request.url));
  }

  return NextResponse.next();
}
