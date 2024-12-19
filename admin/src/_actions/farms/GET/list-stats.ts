"use server";

import ApiService from "@shared/service";


export async function listStats() {
  const response = ApiService.GET({
    url: `/stats`,
  });

  return response;
}