"use server";

import ApiService from "@shared/service";

export async function updateUser(data: FormData) {
  const response = ApiService.PATCH({
    url: "/me",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: data,
  });

  return response;
}
