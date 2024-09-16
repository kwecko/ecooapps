"use server";

import ApiService from "@shared/service/index";

interface FetchFarmOrdersRequest {
  box_id: string;
}

export async function fetchFarmOrders({ box_id }: FetchFarmOrdersRequest) {
  const response = ApiService.GET({
    url: `/boxes/${box_id}`,
  });

  return response;
}
