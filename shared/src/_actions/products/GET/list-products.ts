"use server";

import ApiService from "@shared/service";

interface ListProductsRequest {
  page: number;
  product?: string;
  archived?: boolean | undefined;
}

export async function listProducts({ page, product, archived }: ListProductsRequest) {
  
  let url = `/products?page=${page}`;

  if (product) {
    url += `&name=${product}`;
  }
  if (archived !== undefined) {
    url += `&archived=${archived}`;
  }

  const response = ApiService.GET({
    url,
  });

  return response;
}
