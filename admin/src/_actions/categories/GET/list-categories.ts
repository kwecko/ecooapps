"use server";

import ApiService from "@shared/service";

export interface ListCategoriesRequest {
  page: number;
}

export async function listCategories({ page }: ListCategoriesRequest) {

  const url = `/categories?page=${page}`;

  const response = ApiService.GET({
    url,
  });
  return response;
}
