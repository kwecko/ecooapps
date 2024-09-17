
"use server";

import ApiService from "@shared/service/index"

interface listProductsProps {
  product: string;
  page: number;
}

export async function listProducts({ product, page }: listProductsProps) {
  const response = ApiService.GET({
    url: `/products?page=${page}&product=${product}`
  })

  return response;
}
