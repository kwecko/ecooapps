"use server";

import ApiService from "@shared/service";

interface UpdateFarmDataRequest {
  farmId: string;
  data: FormData;
}

export async function updateFarm({ farmId, data }: UpdateFarmDataRequest) {
  const response = ApiService.PATCH({
    url: `/farms/${farmId}`,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  });

  return response;
}
