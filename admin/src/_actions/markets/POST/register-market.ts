"use server";

import ApiService from "@shared/service";

interface RegisterMarketRequest {
  name: string;
  description?: string;
  cycle_id?: string;
}

export async function registerMarket({ name, description, cycle_id }: RegisterMarketRequest) {
  const response = await ApiService.POST({
    url: "/markets",
    data: {
      name,
      ...(description && { description }),
      ...(cycle_id && { cycle_id }),
    },
  });
  
  return response;
}

