import { AppID } from "@shared/library/types/app-id";

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

export async function validateAccess(appID: AppID, roles: string[]) {
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
