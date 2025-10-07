"use server";

import ApiService from "@shared/service";

export async function listCycles() {
  const response = ApiService.GET({
    url: "/cycles",
  });

  return response;
}
