"use server";

import ApiService from "@shared/service";

interface HandleFarmsStatusRequest {
  farm_id: string;
  status: "ACTIVE" | "PENDING" | "INACTIVE";
}

export async function handleFarmStatus({ 
  farm_id,
  status
}: HandleFarmsStatusRequest) {
  const response = ApiService.PATCH({
    url: `/farms/${farm_id}`,
    data: { status: status },
  });

  return response;
}