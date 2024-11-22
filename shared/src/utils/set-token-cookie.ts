"use server"

import { cookies } from "next/headers"
import { AppID } from "../library/types/app-id"
import { tokenKeys } from "../data/token-keys";

interface SetTokenCookieProps {
  token: string;
  appID: AppID
}

export const SetTokenCookie = ({ token, appID }: SetTokenCookieProps) => {
  const tokenKey = tokenKeys[appID];

  cookies().delete(tokenKey)
  cookies().set(tokenKey, token, {
    domain: process.env.APP_DOMAIN,
    httpOnly: process.env.NODE_ENV !== 'development',
    secure: process.env.NODE_ENV !== 'development',
    sameSite: "none",
    path: "/",
  })
}