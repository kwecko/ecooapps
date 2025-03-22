"use server";

import ApiService from "@shared/service";

interface ListProductsRequest {
  product: string;
  page: number;
}

export async function listProducts({ page, product }: ListProductsRequest) {
  
  if (!product) {
    const response = ApiService.GET({
      url: `/products?page=${page}`,
    });
    return response;
  }
  const response = ApiService.GET({
    url: `/products?page=${page}&name=${product}`,
  });

  return response;
}
