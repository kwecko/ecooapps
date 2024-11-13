"use server";

import { IUpdateFarm } from "@shared/interfaces/farm";
import ApiService from "@shared/service/index";

export async function updateFarm(data: IUpdateFarm) {
  const response = ApiService.PATCH({
    url: "/farms",
    data,
  });

  return response;
}
