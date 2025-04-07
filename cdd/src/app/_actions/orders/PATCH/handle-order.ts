"use server";

import ApiService from "@shared/service";

export interface HandleBoxRequest {
  box_id: string;
  order_id: string;
  status: "RECEIVED" | "CANCELLED";
}

export async function handleOrder({
  box_id,
  order_id,
  status,
}: HandleBoxRequest) {
  const response = await ApiService.PATCH({
    url: `/orders/${order_id}`,
    data: {
      status: status,
    },
  });

  return response;
}
