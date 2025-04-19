"use server";

import ApiService from "@shared/service";

interface FetchCatalogRequest {
  catalog_id: string;
  page: number;
  product?: string;
}

export async function fetchCatalog({
  catalog_id,
  page = 1,
  product,
}: FetchCatalogRequest) {
  const response = ApiService.GET({
    url: `/catalogs/${catalog_id}?page=${page}${
      product ? `&product=${product}` : ""
    }`,
  });
  return response;
}
