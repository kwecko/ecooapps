"use server";

import ApiService from "@shared/service";

export interface UpdateCatalogRequest {
  catalog_id: string;
  offers: {
    id: string;
    amount?: number;
    price?: number;
    description?: string;
    deleted?: boolean;
  }[];
}

export async function updateCatalog({
  catalog_id,
  offers,
}: UpdateCatalogRequest) {
  const response = await ApiService.PATCH({
    url: `/catalogs/${catalog_id}`,
    data: {
      offers,
    },
  });

  return response;
}
