"use server";

import ApiService from "@shared/service";

export interface UpdateFarmRequest {
  name: string;
  tally: string;
  description?: string;
}

export async function updateFarm({
  name,
  tally,
  description,
}: UpdateFarmRequest) {
  const response = ApiService.PATCH({
    url: "/farms",
    data: {
      name,
      tally,
      description,
    },
  });

  return response;
}
