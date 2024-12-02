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
    url: `/catalogs/current?page=${page}&cycle_id=${cycle_id}`,
  });
  return response;
}
