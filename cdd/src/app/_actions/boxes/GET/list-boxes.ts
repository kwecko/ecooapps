"use server";

import ApiService from "@shared/service";

interface ListBoxesRequest {
  cycle_id: string;
  page: number;
  name?: string;
}

export async function listBoxes({
  cycle_id,
  page,
  name = "",
}: ListBoxesRequest) {
  const response = ApiService.GET({
    url: `/boxes?cycle_id=${cycle_id}&page=${page}&name=${name}`,
  });

  return response;
}
