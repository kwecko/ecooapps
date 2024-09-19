"use server";

import ApiService from "@shared/service/index";

interface HandleOrderDeliveryRequest {
  box_id: string;
  status: "RECEIVED" | "CANCELLED";
}

export async function handleOrderDelivery({
  box_id,
  status,
}: HandleOrderDeliveryRequest) {
  const response = ApiService.PATCH({
    url: `/boxes/${box_id}`,
    data: { box_id, status },
  });

  return response;
}
