"use server";

import ApiService from "@shared/service";

interface SearchCatalogsRequest {
  cycle_id: string;
  page: number;
  product?: string;
}

export async function searchCatalogs({
  cycle_id,
  page,
  product,
}: SearchCatalogsRequest) {
  const response = ApiService.GET({
    url: `/catalogs?page=${page}&cycle_id=${cycle_id}${
      product ? `&product=${product}` : ""
    }`,
  });

  console.log("response");
  console.log(response);
  return response;
}
