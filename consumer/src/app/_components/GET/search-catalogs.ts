"use server";

import ApiService from "@shared/service";

interface SearchCatalogsRequest {
  cycle_id: string;
  page: number;
  product?: string;
	available?: boolean;
}

export async function searchCatalogs({
  cycle_id,
  page,
  product,
	available,
}: SearchCatalogsRequest) {
  const response = ApiService.GET({
    url: `/catalogs?page=${page}&cycle_id=${cycle_id}${product ? `&product=${product}` : ""}${available ? `&available=${available}` : ""}`
  });
  return response;
}
