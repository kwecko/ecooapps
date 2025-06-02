"use server";

import ApiService from "@shared/service";

interface FetchCurrentCatalogRequest {
  cycle_id: string;
  since?: string;
  page: number;
}

export async function fetchCurrentCatalog({
  cycle_id,
  since,
  page = 1,
}: FetchCurrentCatalogRequest) {

  const params = new URLSearchParams();

  params.append("page", page.toString());
  params.append("available", "true");
  if (since) params.append("since", since);

  const response = ApiService.GET({
    url: `/cycles/${cycle_id}/catalog?${params.toString()}`,
  });
  return response;
}
