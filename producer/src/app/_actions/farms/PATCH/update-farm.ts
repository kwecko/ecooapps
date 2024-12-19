"use server";

import ApiService from "@shared/service";

export interface UpdateFarmRequest {
  name: string;
  description?: string;
}

export async function updateFarm({ name, description }: UpdateFarmRequest) {
  const response = ApiService.PATCH({
    url: "/farms/own",
    data: {
      name,
      description,
    },
  });

  return response;
}
