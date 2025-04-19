"use server";

import ApiService from "@shared/service";

export interface FetchBagRequest {
  bag_id: string;
  page: number;
}

export async function fetchBag({ bag_id, page = 1 }: FetchBagRequest) {
  const statuses = ["PENDING", "RECEIVED", "REJECTED"];

  const response = ApiService.GET({
    url: `/bags/${bag_id}?page=${page}&statuses=${statuses.join(",")}`,
  });

  return response;
}
