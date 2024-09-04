"use server"

import ApiService from "@cdd/service/index"

interface ListBagsRequest {
  bag_id: string
  status: "PENDING" | "SEPARATED" | "DISPATCHED";
}

export async function handleBag({ bag_id, status }: ListBagsRequest) {
  const response = ApiService.PATCH({
    url: `/bags/${bag_id}`,
    data: { status }
  })

  return response;
}
