"use server";

import { fetchUserFarm } from "@shared/_actions/farms/GET/fetch-user-farm";
import { AppID } from "@shared/library/types/app-id";
import ApiService from "@shared/service";
import { SetOnCookie } from "@shared/utils/set-on-cookie";
import { SetTokenCookie } from "@shared/utils/set-token-cookie";
import { validateAccess } from "@shared/utils/validate-app-access";

interface AuthenticateRequest {
  email: string;
  password: string;
  appID: AppID;
}

export async function authenticate({
  email,
  password,
  appID,
}: AuthenticateRequest) {
  const data = { email, password, type: "BASIC" };

  const response = await ApiService.POST({ url: "/auth", data });

  if (response.message) return { message: response.message };

  const { user, token } = response.data;

  const roles = user.roles;

  const accessError = await validateAccess(appID, roles);

  if (accessError) return accessError;

  SetTokenCookie({ token, appID });

  if (roles.includes("PRODUCER") && appID === "PRODUCER") {
    const response = await fetchUserFarm();
    if (response.message)
      return { message: "Você não é administrador de um agronegócio." };

    const { status } = response.data;
    SetOnCookie({ key: "farm_status", value: status });
  }

  return response;
}
