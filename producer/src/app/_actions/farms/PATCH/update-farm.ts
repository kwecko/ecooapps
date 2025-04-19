"use server";

import ApiService from "@shared/service";

export async function updateFarm(farmId: string, data: FormData) {
  const response = ApiService.PATCH({
    url: `/farms/${farmId}`,
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
}
