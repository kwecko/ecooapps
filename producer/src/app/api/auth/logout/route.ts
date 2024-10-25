import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers"; 

export async function GET(request: NextRequest){
  const logoutRedirectUrl = new URL('/inicio', request.url);

  cookies().delete('producer_token')

  return NextResponse.redirect(logoutRedirectUrl);
} 