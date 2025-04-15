"use server";

import ApiService from "@shared/service";

export interface ListCategoriesRequest {
  page: number;
}

export async function listCategories({ page }: ListCategoriesRequest) {
  const params = new URLSearchParams();

  params.append("page", page.toString());

  const url = `/categories/?${params.toString()}`;

  const response = ApiService.GET({
    url,
  });
  return response;
}
