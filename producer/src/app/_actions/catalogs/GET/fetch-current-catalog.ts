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
  const response = ApiService.GET({
    url: `/cycles/${cycle_id}/catalog?page=${page}&available=true`,
  });
  return response;
}
