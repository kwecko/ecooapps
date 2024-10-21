import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { steps } from "./app/cadastrar/data";

const PAGES_IN_CONSTRUCTION =
  process.env.PAGES_IN_CONSTRUCTION?.split(",") || [];

const PROTECTED_PAGES = ["/oferta", "/cadastrar/4", "alterar-cadastro", "informacoes-ciclo"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const access_token = request.cookies.get("token")?.value;

  const pathnameStartsWith = (startsWith: string[]) =>
    startsWith.some((item) => pathname.startsWith(item));

  if (pathname.startsWith("/cadastrar")) {

    const currentStep = pathname.split("/").pop();

    if (!steps.includes(parseInt(currentStep as string))) {
      return NextResponse.redirect(new URL("/cadastrar/1", request.url));
    }
  }

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
  matcher: ["/", "/oferta/:path*", "/cadastrar/:path*"],
};
