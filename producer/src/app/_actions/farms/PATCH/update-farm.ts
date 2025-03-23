"use server";

import ApiService from "@shared/service";

export async function updateFarm(data: FormData) {
  const response = ApiService.PATCH({
    url: "/farms/own",
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
}
