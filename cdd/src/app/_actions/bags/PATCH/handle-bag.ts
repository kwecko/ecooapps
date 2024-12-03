"use server";

import ApiService from "@shared/service";

interface HandleBagRequest {
  bag_id: string;
  status: "PENDING" | "SEPARATED" | "DISPATCHED" | "RECEIVED" | "DEFERRED";
}

export async function handleBag({ bag_id, status }: HandleBagRequest) {
  const response = ApiService.PATCH({
    url: `/bags/${bag_id}`,
    data: { status },
  });

  return response;
}
