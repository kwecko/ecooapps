"use server";

import ApiService from "@shared/service";

interface ListBagsRequest {
  page: number;
}

export async function listBags({ 
  page,
}: ListBagsRequest) {
  const response = ApiService.GET({
    url: `/bags?page=${page}`,
  });

  return response;
}