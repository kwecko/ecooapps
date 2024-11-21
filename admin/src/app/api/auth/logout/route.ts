import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const logoutRedirectUrl = new URL("/login", request.url);

  cookies().delete("admin_token");

  return NextResponse.redirect(logoutRedirectUrl);
}
