"use server"

import ApiService from "@shared/service/index"

interface ListBagsRequest {
  page: number;
  cycle_id: string;
  statuses: ("PENDING" | "SEPARATED" | "DISPATCHED" | "RECEIVED" | "DEFERRED" | "CANCELLED")[];
  name?: string;
}

export async function listBags({ page, cycle_id, statuses, name }: ListBagsRequest) {
  const statusParams = `statuses=` + statuses.map((singleStatus) => `${singleStatus}`).join(',');
  const url = `/bags?page=${page}&cycle_id=${cycle_id}&${statusParams}${name ? `&name=${name}` : ''}`;

  const response = ApiService.GET({
    url
  });

  return response;
}
