"use server";

import ApiService from "@shared/service";

interface RegisterMarketRequest {
  name: string;
  description?: string;
}

export async function registerMarket({ name, description }: RegisterMarketRequest) {
  const response = await ApiService.POST({
    url: "/markets",
    data: {
      name,
      ...(description && { description }),
    },
  });

  return response;
}

