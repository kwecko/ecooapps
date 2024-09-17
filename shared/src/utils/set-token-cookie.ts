import { cookies } from "next/headers"

export const SetTokenCookie = (token: string) => {
  cookies().delete("token")
  cookies().set("token", token)
}