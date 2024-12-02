"use server";

import ApiService from "@shared/service";

interface RequestPasswordUpdateRequest {
  email: string;
}

export async function requestPasswordUpdate({
  email,
}: RequestPasswordUpdateRequest) {
  const response = ApiService.POST({
    url: `/me/password`,
    data: {
      email: email,
    },
  });

  return response;
}
