"use server";

import ApiService from "@shared/service";

interface FetchCatalogRequest {
  catalog_id: string;
  cycle_id: string;
  page: number;
  product?: string;
}

export async function fetchCatalog({
  catalog_id,
  cycle_id,
  page = 1,
  product,
}: FetchCatalogRequest) {
  const response = ApiService.GET({
    url: `/catalogs/${catalog_id}?page=${page}&cycle_id=${cycle_id}${
      product ? `&product=${product}` : ""
    }`,
  });
  return response;
}
