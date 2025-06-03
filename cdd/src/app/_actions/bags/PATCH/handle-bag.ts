"use server";

import ApiService from "@shared/service";

export interface HandleBagRequest {
  bag_id: string;
  status: "PENDING" | "VERIFIED" | "MOUNTED" | "DISPATCHED" | "RECEIVED" | "DEFERRED";
}

export async function handleBag({ bag_id, status }: HandleBagRequest) {
  const response = ApiService.PATCH({
    url: `/bags/${bag_id}`,
    data: { status },
  });

  return response;
}
