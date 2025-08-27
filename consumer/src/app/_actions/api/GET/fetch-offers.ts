"use server";

import ApiService from "@shared/service";

interface FetchOffersRequest {
  page: number;
	available: boolean;
	cycle_id: string;
	product?: string;
	category_id?: string;
}

export async function fetchOffers({
  page,
	available,
	cycle_id,
	product,
	category_id
}: FetchOffersRequest) {
	const url =  `/offers?page=${page}&cycle_id=${cycle_id}&available=${available}${product ? `&product=${product}` : ""}${category_id ? `&category_id=${category_id}` : ""}`;
  const response = ApiService.GET({
    url: `/offers?page=${page}&cycle_id=${cycle_id}&available=${available}${product ? `&product=${product}` : ""}${category_id ? `&category_id=${category_id}` : ""}`,
  });
  return response;
}
