"use server";

import ApiService from "@shared/service";

interface UpdateImageRequest {
  farmId: string;
  data: FormData
}

export async function updateImage({ farmId, data }: UpdateImageRequest) {
  const response = await ApiService.POST({
    url: `/farms/${farmId}/images`,
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
}