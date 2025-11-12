"use server";

import ApiService from "@shared/service";

interface FetchCurrentCatalogRequest {
  cycle_id: string;
  farm_id?: string;
  page: number;
}

export async function fetchCurrentCatalog({
  cycle_id,
  farm_id,
  page = 1,
}: FetchCurrentCatalogRequest) {

  const params = new URLSearchParams();

  params.append("cycle_id", cycle_id);
  params.append("page", page.toString());
  params.append("available", "true");
  if (farm_id) {
    params.append("farm_id", farm_id);
  }

  const response = ApiService.GET({
    url: `/catalogs?${params.toString()}`,
  });
  return response;
}
