"use server";

import ApiService from "@shared/service/index";

interface HandleOrderDeliveryRequest {
  box_id: string;
  order_id: string;
  status: "RECEIVED" | "CANCELLED";
}

export async function handleOrderDelivery({
  box_id,
  order_id,
  status,
}: HandleOrderDeliveryRequest) {
  const response = await ApiService.PATCH({
    url: `/boxes/${box_id}`,
    data: { 
      orders: [ 
        {
          id: order_id , 
          status: status 
        }
      ]
    },
  });

  return response;
}
