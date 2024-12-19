"use server";

import ApiService from "@shared/service";

export interface RequestPasswordUpdateRequest {
  email: string;
}

export async function requestPasswordUpdate({
  email,
}: RequestPasswordUpdateRequest) {
  const response = ApiService.POST({
    url: "/auth/password",
    data: {
      email: email,
    },
  });

  return response;
}
