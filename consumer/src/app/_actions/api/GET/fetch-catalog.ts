"use server";

import ApiService from "@shared/service";

interface FetchCatalogRequest {
  catalog_id: string;
  page: number;
  product?: string;
	available?: 'MARKET' | 'CYCLE';
	remaining?: boolean;
}

export async function fetchCatalog({
  catalog_id,
  page = 1,
  product,
	available,
	remaining
}: FetchCatalogRequest) {
  const response = ApiService.GET({
    url: `/catalogs/${catalog_id}?page=${page}${product ? `&product=${product}` : ""}${available ? `&available=${available}` : ""}${remaining ? `&remaining=${remaining}` : ""}`,
  });
  return response;
}
