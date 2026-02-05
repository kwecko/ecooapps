"use server";

import ApiService from "@shared/service";

interface UpdateOfferRequest {
  offer_id: string;
  data: {
    amount?: number;
    price?: number;
    description?: string;
    comment?: string;
    active?: boolean;
    expires_at?: string;
    market_id?: string | null;
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

