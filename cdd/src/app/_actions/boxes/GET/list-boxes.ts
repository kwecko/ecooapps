"use server";

import ApiService from "@shared/service";

export interface ListBoxesRequest {
  cycle_id: string;
  page: number;
  farm?: string;
}

export async function listBoxes({
  cycle_id,
  page,
  farm = "",
}: ListBoxesRequest) {
  const response = ApiService.GET({
    url: `/boxes?cycle_id=${cycle_id}&page=${page}&farm=${farm}`,
  });

  return response;
}
