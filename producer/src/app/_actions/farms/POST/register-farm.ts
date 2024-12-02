"use server";

import ApiService from "@shared/service";

interface RegisterFarmRequest {
  name: string;
  tally: string;
}

export async function registerFarm({ name, tally }: RegisterFarmRequest) {
  const response = ApiService.POST({
    url: "/farms",
    data: {
      name,
      tally,
    },
  });

  return response;
}
