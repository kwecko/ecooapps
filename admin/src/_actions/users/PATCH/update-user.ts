"use server";

import ApiService from "@shared/service";

interface UpdateUserRequest {
  user_id: string;
  data: FormData
}

export async function updateUser({ user_id, data }: UpdateUserRequest) {
  const formData: Record<string, any> = {};

  if (data.get("first_name")) {
    formData.first_name = data.get("first_name");
  }
  if (data.get("last_name")) {
    formData.last_name = data.get("last_name");
  }
  if (data.get("cpf")) {
    formData.cpf = data.get("cpf");
  }
  if (data.get("email")) {
    formData.email = data.get("email");
  }
  if (data.get("phone")) {
    formData.phone = data.get("phone");
  }
  const response = await ApiService.PATCH({
    url: `/users/${user_id}`,
    data: formData
  });

  return response;
}