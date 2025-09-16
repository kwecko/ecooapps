"use server";

import ApiService from "@shared/service";

interface ListBagsRequest {
  page: number;
  statuses: string[];
  user: string;
  date_from?: string;
  date_to?: string;
}

export async function listBags({
  page,
  statuses,
  user,
  date_from,
  date_to,
}: ListBagsRequest) {
  const params = new URLSearchParams();

  params.append("page", page.toString());

  if (statuses && statuses.length > 0) {
    params.append("statuses", statuses.join(","));
  }

  if (user) {
    params.append("user", user);
  }

  if (date_from) {
    params.append("since", date_from);
  }

  if (date_to) {
    params.append("before", date_to);
  }

  const queryString = params.toString();
  const url = `/bags${queryString ? `?${queryString}` : ""}`;

  console.log(url);

  const response = ApiService.GET({
    url,
  });

  return response;
}
