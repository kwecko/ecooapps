"use server";

import ApiService from "@shared/service/index";

interface SearchCatalogsRequest {
  cycle_id: string;
  page: number;
  product?: string;
}

export async function searchCatalogs({ cycle_id, page, product = "" }: SearchCatalogsRequest) {
  const response = ApiService.GET({
    url: `/catalogs?cycle_id=${cycle_id}&page=${page}&product=${product}`,
  })

  return response;
}
