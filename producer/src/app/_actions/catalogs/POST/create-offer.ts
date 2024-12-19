"use server";

import ApiService from "@shared/service";

export interface CreateOfferRequest {
  cycle_id: string;
  product_id: string;
  amount: number;
  price: number;
  description?: string;
}

export async function createOffer({
  cycle_id,
  product_id,
  amount,
  price,
  description,
}: CreateOfferRequest) {
  const response = ApiService.POST({
    url: "/catalogs",
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
