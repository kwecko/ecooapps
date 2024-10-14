"use server"

import ApiService from "@shared/service/index"

interface ListBagsRequest {
  page: number;
  cycle_id: string;
  status: "PENDING" | "SEPARATED" | "DISPATCHED" | "RECEIVED" | "DEFERRED" | "CANCELLED";
  name?: string;
}

export async function listBags({ page, cycle_id, status, name }: ListBagsRequest) {
  const response = ApiService.GET({
    url: `/bags?page=${page}&cycle_id=${cycle_id}&status=${status}${name ? `&name=${name}` : ''}`
  })

  return response;
}
