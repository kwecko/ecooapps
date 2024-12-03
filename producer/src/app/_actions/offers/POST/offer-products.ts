"use server";

import ApiService from "@shared/service";

interface OfferProductsRequest {
  cycle_id: string;
  product_id: string;
  amount: number;
  price: number;
  description?: string;
}

export async function OfferProducts({
  cycle_id,
  product_id,
  amount,
  price,
  description,
}: OfferProductsRequest) {
  const response = ApiService.POST({
    url: `/offers`,
    data: {
      product_id,
      cycle_id,
      amount,
      price,
      description,
    },
  });
  return response;
}
