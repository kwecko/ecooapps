"use server";

import ApiService from "@shared/service";

interface FetchCurrentCatalogRequest {
  farm_id: string;
  before?: string;
  page: number;
}

export async function fetchCurrentCatalog({
  farm_id,
  before,
  page = 1,
}: FetchCurrentCatalogRequest) {

  const params = new URLSearchParams();

  params.append("page", page.toString());

  params.append("available", "CYCLE");

  const response = ApiService.GET({
    url: `/catalogs/${farm_id}?${params.toString()}`,
  });
  return response;
}
