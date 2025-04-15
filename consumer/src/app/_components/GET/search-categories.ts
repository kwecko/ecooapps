"use server";

import ApiService from "@shared/service";

interface SearchCategoriesRequest {
	cycle_id: string;
	page: number;
}

export async function searchCategories({
	cycle_id,
	page
}: SearchCategoriesRequest) {
	const response = ApiService.GET({
		url: `/categories?page=${page}&cycle_id=${cycle_id}`,
	});
	return response;
}
