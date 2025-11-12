"use server";

import ApiService from "@shared/service";

export async function fetchFarmsOwn() {
  const response = ApiService.GET({
    url: `/farms/own`,
  });
  
  return response;
}