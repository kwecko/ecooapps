"use server";

import ApiService from "@shared/service";

interface SearchCategoriesRequest {
	cycle_id: string;
	page: number;
	available: 'MARKET' | 'CYCLE';
}

export async function searchCategories({
	cycle_id,
	page,
	available
}: SearchCategoriesRequest) {
	const response = ApiService.GET({
		url: `/categories?page=${page}&cycle_id=${cycle_id}&available=${available}`,
	});
	return response;
}
