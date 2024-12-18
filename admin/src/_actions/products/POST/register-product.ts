"use server";

import ApiService from "@shared/service";

export async function registerProduct(data: FormData) {
  const response = await ApiService.POST({
    url: "/products",
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
}
