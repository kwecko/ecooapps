"use server"

import ApiService from "@shared/service/index"

interface HandleOrderDeliveryRequest {
  cycle_id: string;
  farm_id: string
  status: "RECEIVED" | "CANCELLED";
}

export async function handleOrderDelivery({ cycle_id, farm_id, status }: HandleOrderDeliveryRequest) {
  const response = ApiService.PATCH({
    url: '/orders',
    data: { cycle_id, farm_id, status }
  })

  return response
}