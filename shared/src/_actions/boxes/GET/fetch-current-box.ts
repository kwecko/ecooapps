"use server";

import ApiService from "@shared/service";

export interface FetchCurrentBoxRequest {
  cycle_id: string;
  page: number;
}

export async function fetchCurrentBox({
  cycle_id,
  page = 1,
}: FetchCurrentBoxRequest) {
  const response = ApiService.GET({
    url: `/boxes/current?cycle_id=${cycle_id}&page=${page}`,
  });

  return response;
}
