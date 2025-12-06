"use server";

import ApiService from "@shared/service";

interface ListBagsRequest {
  page: number;
  market_id: string;
}

export async function listBags({
  page,
  market_id,
}: ListBagsRequest) {
  const params = new URLSearchParams();

  params.append("page", page.toString());
  params.append("market_id", market_id);

  const queryString = params.toString();
  const url = `/bags${queryString ? `?${queryString}` : ""}`;

  const response = ApiService.GET({
    url,
  });

  return response;
}
