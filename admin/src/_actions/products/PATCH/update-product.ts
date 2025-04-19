"use server";

import ApiService from "@shared/service";

interface UpdateProductRequest {
  product_id: string;
  data: FormData
}

export async function updateProduct({ product_id, data }: UpdateProductRequest) {
  const response = await ApiService.PATCH({
    url: `/products/${product_id}`,
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
}