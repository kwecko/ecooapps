"use server";

import ApiService from "@shared/service";

interface UpdateMarketRequest {
  market_id: string;
  data: {
    name?: string;
    description?: string;
    open?: string;
  };
}

export async function updateMarket({ market_id, data }: UpdateMarketRequest) {
  const url = `/markets/${market_id}`;

  const response = await ApiService.PATCH({
    url,
    data,
  });

  return response;
}

