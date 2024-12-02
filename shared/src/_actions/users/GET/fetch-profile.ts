"use server";

import ApiService from "@shared/service";

export async function fetchProfile() {
  const response = ApiService.GET({
    url: "/me",
  });

  return response;
}
