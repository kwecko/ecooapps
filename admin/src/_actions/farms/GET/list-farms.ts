"use server";

import ApiService from "@shared/service";

interface ListFarmsRequest {
  page: number;
  farm?: string;
}

export async function listFarms({ 
  page,
  farm = "",
}: ListFarmsRequest) {
  const response = ApiService.GET({
    url: `/farms?page=${page}&farm=${farm}`,
  });

  return response;
}