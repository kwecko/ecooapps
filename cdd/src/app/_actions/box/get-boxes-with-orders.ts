"use server";

import ApiService from "@shared/service/index";

interface FetchFarmsWithOrdersRequest {
  cycle_id: string;
  page: number;
  name?: string;
}

export async function getBoxesWithOrders({
  cycle_id,
  page,
  name,
}: FetchFarmsWithOrdersRequest) {
  const response = ApiService.GET({
    url: `/boxes?cycle_id=${cycle_id}&page=${page}&name=${name}`,
  });

  return response;
}
