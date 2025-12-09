"use server";

import ApiService from "@shared/service";

interface CreateProducerRequest {
  data: FormData
}

export async function createProducer({ data }: CreateProducerRequest) {
  const response = await ApiService.POST({
    url: `/producers`,
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
}