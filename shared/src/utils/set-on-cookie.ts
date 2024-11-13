"use server"

import { cookies } from "next/headers"

interface SetOnCookieProps {
  key: string;
  value: any;
}

export const SetOnCookie = ({ key, value }: SetOnCookieProps) => {
  cookies().delete(key)
  cookies().set(key, value, {
    httpOnly: process.env.NODE_ENV !== 'development',
    secure: process.env.NODE_ENV !== 'development',
    sameSite: "lax",
    path: "/",
  })
}