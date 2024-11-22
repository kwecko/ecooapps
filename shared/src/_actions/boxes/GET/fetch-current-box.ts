"use server";

import ApiService from "@shared/service";

interface FetchCurrentBoxRequest {
  cycle_id: string;
}

export async function fetchCurrentBox({ cycle_id }: FetchCurrentBoxRequest) {
  const response = ApiService.GET({
    url: `/boxes/current?cycle_id=${cycle_id}`,
  });

  return response;
}
