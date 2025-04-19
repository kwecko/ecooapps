"use server";

import ApiService from "@shared/service";

export interface ListFarmsRequest {
  page: number;
  farm?: string;
}

export async function listFarms({ page, farm }: ListFarmsRequest) {
  const params = new URLSearchParams();

  params.append("page", page.toString());
  if (farm) {
    params.append("farm", farm);
  }

  const queryString = params.toString();
  const url = `/farms${queryString ? `?${queryString}` : ""}`;

  const response = ApiService.GET({
    url,
  });
  return response;
}
