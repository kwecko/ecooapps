import { cookies } from "next/headers";
import { toast } from "sonner";

import { UI_WARNINGS } from "@shared/warnings";
import { CustomAxios } from "@shared/core/CustomAxios";

import { getAppID } from "./library/get-app-id";

const isAbsoluteUrl = (url: string): boolean => {
  return url.startsWith("http://") || url.startsWith("https://");
};

const setTokenCookie = (token: string) => {
  cookies().delete("token");
  cookies().set("token", token);
};

const getTokenCookie = () => {
  return cookies().get("token")?.value || null;
};

const handleTimeout = (error: any) => {
  if (typeof window !== "undefined") {
    toast(
      UI_WARNINGS["shared"]["general"]["connection-timeout-critical"]["message"]
    );

    return null;
  }

  error.message = "Request failed to connect (on the server custom Axios).";
  return error;
};

const handleForbidden = (error: any) => {
  if (typeof window !== "undefined") {
    const app_id = getAppID().toLocaleLowerCase() as "producer" | "cdd";

    toast.warning(UI_WARNINGS[app_id]["general"]["forbidden"]["message"]);
  }

  const redirect_url = process.env.FORBIDDEN_REDIRECT_URL;
  if (redirect_url) {
    if (!isAbsoluteUrl(redirect_url) && typeof window !== "undefined") {
      window.location.href = redirect_url;
      return null;
    }

    // redirect(redirect_url);
  }

  return error;
};

export const nextAxios = new CustomAxios(
  setTokenCookie,
  getTokenCookie,
  handleTimeout,
  handleForbidden
).getInstance();
