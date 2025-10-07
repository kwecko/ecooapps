"use server";

import ApiService from "@shared/service";

export async function listWarehouse() {

  const url = `/warehouse`;

  const response = ApiService.GET({
    url,
  });
  return response;
}
