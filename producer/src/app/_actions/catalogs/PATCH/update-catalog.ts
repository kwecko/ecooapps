"use server";

import ApiService from "@shared/service";

export interface UpdateCatalogRequest {
  offer_id: string;
  data: {
    amount?: number;
    price?: number;
    description?: string;
    expires_at?: string;
  };
}

export async function updateCatalog({
  offer_id,
  data,
}: UpdateCatalogRequest) {
  const response = await ApiService.PATCH({
    url: `/offers/${offer_id}`,
    data,
  });

  return response;
}
