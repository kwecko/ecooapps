"use server";

import ApiService from "@shared/service";

export interface UpdateUserRequest {
  first_name?: string;
  last_name?: string;
  email?: string;
  cpf?: string;
  phone?: string;
  password?: string;
}

export async function updateUser(data: UpdateUserRequest) {
  const response = ApiService.PATCH({
    url: "/me",
    data,
  });

  return response;
}
