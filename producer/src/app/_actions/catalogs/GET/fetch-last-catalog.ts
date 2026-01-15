"use server";

import ApiService from "@shared/service";

interface FetchLastCatalogRequest {
  farm_id: string;
  since?: string;
  before?: string;
  page: number;
}

export async function fetchLastCatalog({
  farm_id,
  since,
  before,
  page = 1,
}: FetchLastCatalogRequest) {

  const params = new URLSearchParams();

  params.append("page", page.toString());
  params.append("available", "false");

  if (since) params.append("since", since);
  if (before) params.append("before", before);

  const response = ApiService.GET({
    url: `/catalogs/${farm_id}?${params.toString()}`,
  });

  return response;
}
