"use server";

import ApiService from "@cdd/service/index"

export async function getOrder(order_id: string) {
  const response = ApiService.GET({
    url: `/orders/${order_id}}`
  })

  return response;
}
