"use server";

import ApiService from "@shared/service";

interface ListUsersRequest {
  page: number;
  first_name?: string;
  last_name?: string;
  roles?: string;
  since?: string;
  before?: string;
}

export async function listUsers({
  page,
  first_name,
  last_name,
  roles,
  since,
  before,
}: ListUsersRequest) {
  const params = new URLSearchParams();

  params.append("page", page.toString());

  if (first_name) {
    params.append("first_name", first_name);
  }

  if (last_name) {
    params.append("last_name", last_name);
  }

  if (roles) {
    params.append("roles", roles);
  }

  if (since) {
    params.append("since", since);
  }

  if (before) {
    params.append("before", before);
  }

  const queryString = params.toString();
  const url = `/users${queryString ? `?${queryString}` : ""}`;

  console.log('list-users', url);

  const response = ApiService.GET({
    url,
  });

  return response;
}
