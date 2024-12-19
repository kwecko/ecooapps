"use server";

import ApiService from "@shared/service";

interface ListProductsRequest {
  page: number;
  product?: string;
}

export async function listProducts({ page, product }: ListProductsRequest) {
  let url = `/products?page=${page}`

  if (product) url += `&name=${product}`

  const response = ApiService.GET({
    url,
  });

  return response;
}
