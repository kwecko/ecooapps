"use server";

import ApiService from "@shared/service";

interface FetchCurrentCatalogRequest {
  cycle_id: string;
  page: number;
}

export async function fetchCurrentCatalog({
  cycle_id,
  page = 1,
}: FetchCurrentCatalogRequest) {

  const params = new URLSearchParams();

  params.append("page", page.toString());
  params.append("available", "true");

  const response = ApiService.GET({
    url: `/cycles/${cycle_id}/catalog?${params.toString()}`,
  });
  return response;
}
