"use server";

import ApiService from "@shared/service";

interface FetchLastCatalogRequest {
  cycle_id: string;
  before?: string;
  page: number;
}

export async function fetchLastCatalog({
  cycle_id,
  before,
  page = 1,
}: FetchLastCatalogRequest) {

  const params = new URLSearchParams();
  params.append("page", page.toString());
  params.append("available", "true");
  if (before) params.append("before", before);

  const response = ApiService.GET({
    url: `/cycles/${cycle_id}/catalog?${params.toString()}`,
  });

  return response;
}
