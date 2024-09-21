import { cookies } from "next/headers"

export const SetTokenCookie = (token: string) => {
  cookies().delete("token")
  cookies().set("token", token, {
    httpOnly: process.env.ENV === "production" || process.env.ENV === "homolog",
    secure: process.env.ENV === "production" || process.env.ENV === "homolog",
    sameSite: "lax",
    path: "/",
  })
}