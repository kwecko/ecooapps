"use server";

import ApiService from "@shared/service";

type BagStatus =
  | "PENDING"
  | "VERIFIED"
  | "MOUNTED"
  | "DISPATCHED"
  | "RECEIVED"
  | "DEFERRED"
  | "CANCELLED";

export interface ListCurrentBagsRequest {
  page: number;
  cycle_id: string;
  statuses: BagStatus[];
  user?: string;
}

export async function listCurrentBags({
  page,
  cycle_id,
  statuses,
  user,
}: ListCurrentBagsRequest) {
  const statusParams = statuses
    .map((singleStatus) => `${singleStatus}`)
    .join(",");
  const url = `/bags/current?page=${page}&cycle_id=${cycle_id}&statuses=${statusParams}${
    user ? `&user=${user}` : ""
  }`;

  const response = ApiService.GET({
    url,
  });

  return response;
}
