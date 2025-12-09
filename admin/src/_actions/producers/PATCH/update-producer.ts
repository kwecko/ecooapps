"use server";

import ApiService from "@shared/service";

interface UpdateProducerRequest {
  producer_id: string;
  data: FormData
}

export async function updateProducer({ producer_id, data }: UpdateProducerRequest) {
  const response = await ApiService.PATCH({
    url: `/producers/${producer_id}`,
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
}