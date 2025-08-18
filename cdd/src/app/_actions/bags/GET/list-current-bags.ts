"use server";

import ApiService from "@shared/service";

type BagStatus =
  | "PENDING"
  | "VERIFIED"
  | "MOUNTED"
  | "DISPATCHED"
  | "RECEIVED"
  | "DEFERRED"
  | "CANCELLED"
  | "FETCH"
  | "FETCHED";

export interface ListCurrentBagsRequest {
  page: number;
  cycle_id: string;
  statuses?: BagStatus[];
  user?: string;
}

export async function listCurrentBags({
  page,
  cycle_id,
  statuses,
  user,
}: ListCurrentBagsRequest) {
  const params = new URLSearchParams();

  params.append("page", page.toString());
  params.append("cycle_id", cycle_id);

  user && params.append("user", user);
  statuses && params.append("statuses", statuses.filter((status) => status !== "FETCH" && status !== "FETCHED").join(","));

  const url = `/bags/current?${params.toString()}`;

  const response = ApiService.GET({
    url,
  });

  return response;
}
