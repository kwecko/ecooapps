"use server";

import ApiService from "@shared/service";

interface GetBagByIdRequest {
  bagId: string;
  paymentsPage: number;
}

export async function getBagById({ bagId, paymentsPage }: GetBagByIdRequest) {
  const params = new URLSearchParams();

  params.append("page", paymentsPage.toString());

  const url = `/bags/${bagId}?${params.toString()}`;

  const response = ApiService.GET({
    url,
  });

  return response;
}
