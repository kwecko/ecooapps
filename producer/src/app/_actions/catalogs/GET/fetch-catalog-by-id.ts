"use server";

import ApiService from "@shared/service";

interface FetchCatalogByIdRequest {
  cycle_id: string;
  before?: string;
  page: number;
}

export async function fetchCatalogById({
  cycle_id,
  before,
  page,
}: FetchCatalogByIdRequest) {

  const params = new URLSearchParams();

  params.append("page", page.toString());

  if (before) params.append("before", before);

  const response = ApiService.GET({
    url: `/cycles/${cycle_id}/catalog?${params.toString()}`,
  });

  return response;
}
