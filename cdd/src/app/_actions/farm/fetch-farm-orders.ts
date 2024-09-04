"use server";

import ApiService from "@cdd/service/index"

interface FetchFarmOrdersRequest {
  farm_id: string;
  cycle_id: string;
}

export async function fetchFarmOrders({
  farm_id,
  cycle_id,
}: FetchFarmOrdersRequest) {
  const response = ApiService.GET({
    url: `/orders/${farm_id}?cycle_id=${cycle_id}`
  })

  return response
}
