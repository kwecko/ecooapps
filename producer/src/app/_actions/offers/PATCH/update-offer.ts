"use server";

import ApiService from "@shared/service";

export interface UpdateOfferRequest {
  offer_id: string;
  data: {
    amount?: number;
    price?: number;
    description?: string;
    expires_at?: string;
  };
}

export async function updateOffer({
  offer_id,
  data,
}: UpdateOfferRequest) {
  const response = await ApiService.PATCH({
    url: `/offers/${offer_id}`,
    data,
  });

  return response;
}
