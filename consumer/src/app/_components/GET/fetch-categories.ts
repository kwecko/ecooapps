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

	const url = `/categories/${category_id}?page=${page}?cycle_id=${cycle_id}`;
	console.log('url', url);
  const response = ApiService.GET({
    url: `/categories/${category_id}?page=${page}&cycle_id=${cycle_id}`,
  });
	console.log('response', response);
  return response;
}
