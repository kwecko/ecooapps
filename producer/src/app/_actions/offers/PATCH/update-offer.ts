"use server";

import ApiService from "@shared/service";

interface UpdateOfferRequest {
  offer_id: string;
  amount?: number;
  price?: number;
  description?: string;
}

export async function UpdateOffer({
  offer_id,
  amount,
  price,
  description,
}: UpdateOfferRequest) {
  const response = ApiService.PATCH({
    url: `/offers/${offer_id}`,
    data: {
      amount,
      price,
      description,
    },
  });
  return response;
}
