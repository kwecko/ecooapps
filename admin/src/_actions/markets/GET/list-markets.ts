"use server";

import ApiService from "@shared/service";

interface ListMarketsRequest {
  page: number;
  name?: string;
  open?: boolean;
}

export async function listMarkets({
  page,
  name,
  open,
}: ListMarketsRequest) {
  const params = new URLSearchParams();

  params.append("page", page.toString());

  if (name) {
    params.append("name", name);
  }

  if (open) {
    params.append("open", open.toString());
  }

  const queryString = params.toString();
  const url = `/markets${queryString ? `?${queryString}` : ""}`;

  const response = ApiService.GET({
    url,
  });

  return response;
}

