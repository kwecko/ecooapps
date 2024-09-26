import { cookies } from "next/headers"

export const SetTokenCookie = (token: string) => {
  const Cookies = cookies()

  Cookies.delete("token")
  Cookies.set("token", token, {
    httpOnly: process.env.NODE_ENV !== 'development',
    secure: process.env.NODE_ENV !== 'development',
    sameSite: "lax",
    path: "/",
  })
}