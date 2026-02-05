"use server";

import ApiService from "@shared/service";

interface UpdateUserRequest {
  user_id: string;
  data: FormData
}

export async function updateUser({ user_id, data }: UpdateUserRequest) {

  console.log(data);

  const response = await ApiService.PATCH({
    url: `/users/${user_id}`,
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
}