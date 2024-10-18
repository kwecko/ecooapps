"use server"

import { cookies } from "next/headers"

export const SetTokenCookie = (token: string) => {
  cookies().delete("token")
  cookies().set("token", token, {
    httpOnly: process.env.NODE_ENV !== 'development',
    secure: process.env.NODE_ENV !== 'development',
    sameSite: "lax",
    path: "/",
  })
}