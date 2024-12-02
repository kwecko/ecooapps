"use server";

import ApiService from "@shared/service/index";

interface ListFarmRequest {
  page: number;
  farm?: string;
}

export async function listFarms({ 
  page,
  farm = "",
}: ListFarmRequest) {
  const response = ApiService.GET({
    url: `/farms?page=${page}&farm=${farm}`,
  });

  return response;
}