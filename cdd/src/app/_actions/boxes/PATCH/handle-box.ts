"use server";

import ApiService from "@shared/service";

export interface HandleBoxRequest {
  box_id: string;
  order_id: string;
  status: "RECEIVED" | "CANCELLED";
}

export async function handleBox({
  box_id,
  order_id,
  status,
}: HandleBoxRequest) {
  const response = await ApiService.PATCH({
    url: `/boxes/${box_id}/handle`,
    data: {
      orders: [
        {
          id: order_id,
          status: status,
        },
      ],
    },
  });

  return response;
}
