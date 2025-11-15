"use server";

import ApiService from "@shared/service";

interface RegisterOfferRequest {
  product_id: string;
  market_id: string;
  amount: number;
  price: number;
  expires_at?: string;
  comment?: string;
  description?: string;
}

export async function registerOffer({
  product_id,
  market_id,
  amount,
  price,
  expires_at,
  comment,
  description,
}: RegisterOfferRequest) {
  const data = {
    product_id,
    market_id,
    amount,
    price,
    expires_at,
    comment,
    description,
  };

  const response = ApiService.POST({
    url: "/offers",
    data,
  });

  return response;
}

