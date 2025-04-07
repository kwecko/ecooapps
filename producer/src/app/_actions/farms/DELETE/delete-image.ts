"use server";

import ApiService from "@shared/service";

interface DeleteImageRequest {
  farmId: string;
  image: string;
}

export async function deleteImage({ farmId, image }: DeleteImageRequest) {
  const response = await ApiService.DELETE({
    url: `/farms/${farmId}/images/${image}`,
  });

  return response;
}