"use server";

import ApiService from "@shared/service";

interface HandleBoxStatusRequest {
  box_id: string;
  order_id: string;
  status: "RECEIVED" | "CANCELLED";
}

export async function handleBoxStatus({
  box_id,
  order_id,
  status,
}: HandleBoxStatusRequest) {
  const response = await ApiService.PATCH({
    url: `/boxes/${box_id}`,
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
