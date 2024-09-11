"use server";

import ApiService from "@shared/service/index"
import { fakeFarms } from "./data";
import { Farm } from "@shared/interfaces/farm";

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
