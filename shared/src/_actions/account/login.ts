"use server";

import { AppID } from "@shared/library/types/app-id";
import ApiService from "@shared/service/index";
import { SetOnCookie } from "@shared/utils/set-on-cookie";
import { SetTokenCookie } from "@shared/utils/set-token-cookie";

interface LoginRequest {
  email: string;
  password: string;
  appID: AppID;
}

interface AppValidationConfigProps {
  allowedRoles: string[];
  errorMessage: string;
}

const appValidationConfig: Record<AppID, AppValidationConfigProps> = {
  CDD: {
    allowedRoles: ["BROKER"],
    errorMessage:
      "Você está tentando acessar um app apenas para administradores!",
  },
  PRODUCER: {
    allowedRoles: ["PRODUCER"],
    errorMessage:
      "Você está tentando acessar um app apenas para administradores ou produtores!",
  },
  CONSUMER: {
    allowedRoles: ["USER"],
    errorMessage:
      "Você está tentando acessar um app apenas para administradores ou consumidores!",
  },
  ADMIN: {
    allowedRoles: ["MANAGER"],
    errorMessage:
      "Você está tentando acessar um app apenas para administradores!",
  },
};

async function validateAccess(appID: AppID, roles: string[]) {
  const validation = appValidationConfig[appID];

  if (
    validation &&
    !roles.some((role) => validation.allowedRoles.includes(role))
  ) {
    return {
      message: validation.errorMessage,
    };
  }

  return null;
}

async function fetchUserFarm() {
  const response = await ApiService.GET({ url: "/farms/own" });

  if (response.message) {
    return { error: "Você não é administrador de um agronegócio." };
  }

  const { status } = response.data;

  SetOnCookie({ key: "farm_status", value: status });

  return null;
}

export async function login({ email, password, appID }: LoginRequest) {
  const data = { email, password, type: "BASIC" };

  const response = await ApiService.POST({ url: "/auth", data });

  if (response.message) return { message: response.message };

  const { user, token } = response.data;

  const roles = user.roles;

  const accessError = await validateAccess(appID, roles);

  if (accessError) return accessError;

  SetTokenCookie({ token, appID });

  if (roles.includes("PRODUCER") && appID === "PRODUCER") {
    const farmError = await fetchUserFarm();

    if (farmError) return { message: farmError.error };
  }

  return response;
}
