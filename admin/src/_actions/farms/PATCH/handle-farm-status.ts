"use server";

import ApiService from "@shared/service/index";

interface HandleFarmStatusRequest {
  farm_id: string;
  status: "ACTIVE" | "PENDING" | "INACTIVE";
}

export async function handleFarmStatus({ 
  farm_id,
  status
}: HandleFarmStatusRequest) {
  const response = ApiService.PATCH({
    url: `/farms/${farm_id}`,
    data: { status: status },
  });

  return response;
}