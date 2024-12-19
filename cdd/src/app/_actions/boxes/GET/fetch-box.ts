"use server";

import ApiService from "@shared/service";

interface FetchBoxRequest {
  box_id: string;
  page: number;
}

export async function fetchBox({ box_id, page = 1 }: FetchBoxRequest) {
  const response = ApiService.GET({
    url: `/boxes/${box_id}?page=${page}`,
  });

  return response;
}
