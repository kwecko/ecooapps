"use server";

import ApiService from "@shared/service/index";

interface FetchFarmsWithOrdersRequest {
  cycle_id: string;
}

export async function getBoxeCurrent({
  cycle_id,
}: FetchFarmsWithOrdersRequest) {
  const response = ApiService.GET({
    url: `/boxes/current?cycle_id=${cycle_id}`,
  });

  return response;
}
