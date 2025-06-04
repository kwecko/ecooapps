"use server";

import ApiService from "@shared/service";

interface FetchLastCatalogRequest {
  cycle_id: string;
  since?: string;
  page: number;
}

export async function fetchLastCatalog({
  cycle_id,
  since,
  page = 1,
}: FetchLastCatalogRequest) {

  const params = new URLSearchParams();
  params.append("page", page.toString());
  params.append("available", "false");
  if (since) params.append("since", since);
  const response = ApiService.GET({
    url: `/cycles/${cycle_id}/catalog?${params.toString()}`,
  });

  return response;
}
