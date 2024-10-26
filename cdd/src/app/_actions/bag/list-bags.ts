"use server"

import ApiService from "@shared/service/index"

interface ListBagsRequest {
  page: number;
  cycle_id: string;
  status: ("PENDING" | "SEPARATED" | "DISPATCHED" | "RECEIVED" | "DEFERRED" | "CANCELLED")[];
  name?: string;
}

export async function listBags({ page, cycle_id, status, name }: ListBagsRequest) {
  const statusParams = status.map((singleStatus) => `status[]=${singleStatus}`).join('&');
  const url = `/bags?page=${page}&cycle_id=${cycle_id}&${statusParams}${name ? `&name=${name}` : ''}`;

  const response = ApiService.GET({
    url
  });

  return response;
}
