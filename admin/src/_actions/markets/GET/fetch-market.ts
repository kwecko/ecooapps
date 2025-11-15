"use server";

import ApiService from "@shared/service";

interface FetchMarketRequest {
  market_id: string;
  page?: number;
}

export async function fetchMarket({ market_id, page = 1 }: FetchMarketRequest) {
  const params = new URLSearchParams();
  params.append("page", page.toString());

  const url = `/markets/${market_id}?${params.toString()}`;

  const response = await ApiService.GET({
    url,
  });

  return response;
}

