"use server";

import ApiService from "@shared/service";

interface FetchBagRequest {
  bag_id: string;
}

export async function fetchBag({ bag_id }: FetchBagRequest) {
  const response = ApiService.GET({
    url: `/bags/${bag_id}`,
  });

  return response;
}
