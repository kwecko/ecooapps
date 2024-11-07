"use server"

import ApiService from "@shared/service/index"

interface ListBagsRequest {
  bag_id: string
  status: "PENDING" | "SEPARATED" | "DISPATCHED" | "RECEIVED" | "DEFERRED";
}

export async function handleBag({ bag_id, status }: ListBagsRequest) {
  const response = ApiService.PATCH({
    url: `/bags/${bag_id}`,
    data: { status }
  })

  return response;
}
