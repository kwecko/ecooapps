import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_PAGES = ["/produtos"];

const PAGES_IN_CONSTRUCTION =
  process.env.PAGES_IN_CONSTRUCTION?.split(",") || [];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const access_token = request.cookies.get("token")?.value;

  const pathnameStartsWith = (startsWith: string[]) =>
    startsWith.some((item) => {
      if (pathname.startsWith(item)) return true;
    });

  if (pathname === "/" || pathnameStartsWith(PROTECTED_PAGES) && !access_token)
    return NextResponse.redirect(
      new URL(process.env.UNAUTHENTICATED_REDIRECT_URL as string, request.url)
    );

  if (pathnameStartsWith(PAGES_IN_CONSTRUCTION))
    return NextResponse.rewrite(new URL("/em-breve", request.url));
}

export const config = {
  matcher: ["/", "/produtos/:path*"],
};
