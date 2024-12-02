"use server";

import ApiService from "@shared/service";

interface ListProductsRequest {
  product: string;
  page: number;
}

export async function listProducts({ product, page }: ListProductsRequest) {
  const response = ApiService.GET({
    url: `/products?page=${page}&product=${product}`,
  });

  return response;
}
