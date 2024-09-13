"use server";

import ApiService from "@shared/service/index";

import data from "@cdd/app/(protected)/(footered)/ofertas/components/farms.json";

interface FecthFarmsWithOrdersRequest {
  cycle_id: string;
  page: number;
  name?: string;
}

export async function fecthFarmsWithOrders({
  cycle_id,
  page,
  name,
}: FecthFarmsWithOrdersRequest) {
  // const response = ApiService.GET({
  //   url: `/boxes?cycle_id=${cycle_id}&page=${page}&name=${name}`
  // })

  return { data: data };
}
