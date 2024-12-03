"use server";

import ApiService from "@shared/service";

interface FetchBoxRequest {
  box_id: string;
}

export async function fetchBox({ box_id }: FetchBoxRequest) {
  const response = ApiService.GET({
    url: `/boxes/${box_id}`,
  });

  return response;
}
