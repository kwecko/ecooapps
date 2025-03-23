"use server";

import ApiService from "@shared/service";

export async function deleteOffer({
  offer_id,
}: {
  offer_id: string;
}) {
  const response = await ApiService.DELETE({
    url: `/offers/${offer_id}`,
  });

  return response;
}
