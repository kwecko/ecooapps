"use server";

import ApiService from "@shared/service";

interface FetchCategoryRequest {
  category_id: string;
	cycle_id: string;
  page: number;
}

export async function fetchCategory({
  category_id,
	cycle_id,
  page = 1
}: FetchCategoryRequest) {
  const response = ApiService.GET({
    url: `/categories/${category_id}?page=${page}&cycle_id=${cycle_id}`,
  });
  return response;
}
