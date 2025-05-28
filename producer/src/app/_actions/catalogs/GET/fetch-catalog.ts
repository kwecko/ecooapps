"use server";

import ApiService from "@shared/service";

interface FetchCatalogRequest {
  farm_id?: string;
  page: number;
  available?: boolean;
}

export async function fetchCatalog({
  farm_id,
  page,
  available = true,
}: FetchCatalogRequest) {

  const params = new URLSearchParams();

  params.append("page", page.toString());
  params.append("available", available.toString());

  if (farm_id) params.append("farm_id", farm_id);

  const response = ApiService.GET({
    url: `/catalogs?${params.toString()}`,
  });

  return response;
}
