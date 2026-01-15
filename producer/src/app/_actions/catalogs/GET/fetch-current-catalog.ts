"use server";

import ApiService from "@shared/service";

interface FetchCurrentCatalogRequest {
  farm_id: string;
  page: number;
  before?: string;
}

export async function fetchCurrentCatalog({
  farm_id,
  page = 1,
  before,
}: FetchCurrentCatalogRequest) {

  const params = new URLSearchParams();

  params.append("page", page.toString());

  if (before) params.append("since", before);

  const response = ApiService.GET({
    url: `/catalogs/${farm_id}?${params.toString()}`,
  });
  return response;
}
