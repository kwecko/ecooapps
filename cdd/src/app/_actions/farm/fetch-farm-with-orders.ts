"use server";

import ApiService from "@cdd/service/index"

interface FecthFarmsWithOrdersRequest {
  cycle_id: string
  page: number
  name?: string
}

export async function fecthFarmsWithOrders({ cycle_id, page, name }: FecthFarmsWithOrdersRequest) {
  const response = ApiService.GET({
    url: `/orders?cycle_id=${cycle_id}&page=${page}&name=${name}`
  })

  return response
}
