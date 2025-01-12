"use server";

import ApiService from "@shared/service";

interface ListBagsRequest {
  page: number;
  date_from?: string;
  date_to?: string;
}

export async function listBags({ page, date_from, date_to }: ListBagsRequest) {
  const params = new URLSearchParams();

  params.append("page", page.toString());

  if (date_from) {
    params.append("since", date_from);
  }

  if (date_to) {
    params.append("before", date_to);
  }

  const queryString = params.toString();
  const url = `/bags${queryString ? `?${queryString}` : ""}`;

  const response = ApiService.GET({
    url,
  });

  return response;
}
