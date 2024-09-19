"use server";

import ApiService from "@shared/service/index"

export async function getOrder(order_id: string) {
  const response = ApiService.GET({
    url: `/orders/${order_id}}`
  })

  return response;
}
