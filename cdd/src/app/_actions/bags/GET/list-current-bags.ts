"use server";

import ApiService from "@shared/service";

interface ListCurrentBagsRequest {
  page: number;
  cycle_id: string;
  statuses: (
    | "PENDING"
    | "SEPARATED"
    | "DISPATCHED"
    | "RECEIVED"
    | "DEFERRED"
    | "CANCELLED"
  )[];
  name?: string;
}

export async function listCurrentBags({
  page,
  cycle_id,
  statuses,
  name,
}: ListCurrentBagsRequest) {
  const statusParams = statuses
    .map((singleStatus) => `${singleStatus}`)
    .join(",");
  const url = `/bags/current?page=${page}&cycle_id=${cycle_id}&statuses=${statusParams}${
    name ? `&name=${name}` : ""
  }`;

  const response = ApiService.GET({
    url,
  });

  return response;
}
