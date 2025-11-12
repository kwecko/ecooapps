"use server";

import ApiService from "@shared/service";

interface FetchLastCatalogRequest {
  cycle_id: string;
  farm_id?: string;
  since?: string;
  page: number;
}

export async function fetchLastCatalog({
  cycle_id,
  farm_id,
  since,
  page = 1,
}: FetchLastCatalogRequest) {

  const params = new URLSearchParams();
  params.append("cycle_id", cycle_id);
  params.append("page", page.toString());
  params.append("available", "false");
  if (farm_id) {
    params.append("farm_id", farm_id);
  }
  if (since) params.append("since", since);

  const response = ApiService.GET({
    url: `/catalogs?${params.toString()}`,
  });

  return response;
}
