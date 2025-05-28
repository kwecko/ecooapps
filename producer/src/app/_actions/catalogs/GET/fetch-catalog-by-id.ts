"use server";

import ApiService from "@shared/service";

interface FetchCatalogByIdRequest {
  catalog_id: string;
  page: number;
}

export async function fetchCatalogById({
  catalog_id,
  page,
}: FetchCatalogByIdRequest) {

  const params = new URLSearchParams();

  params.append("page", page.toString());

  const response = ApiService.GET({
    url: `/catalogs/${catalog_id}?${params.toString()}`,
  });

  return response;
}
