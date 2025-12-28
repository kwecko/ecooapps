"use server";

import ApiService from "@shared/service";

interface FetchCategoryRequest {
  category_id: string;
	cycle_id: string;
  page: number;
	available: 'MARKET' | 'CYCLE';
}

export async function fetchCategory({
  category_id,
	cycle_id,
  page,
	available
}: FetchCategoryRequest) {
  const response = ApiService.GET({
    url: `/categories/${category_id}?page=${page}&cycle_id=${cycle_id}&available=${available}`,
  });
  return response;
}
