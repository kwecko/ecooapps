"use server";

import ApiService from "@shared/service";

interface ListProductsRequest {
  page: number;
  product?: string;
  archived?: boolean | undefined;
  category_id?: string | undefined;
}

export async function listProducts({
  page,
  product,
  archived,
  category_id,
}: ListProductsRequest) {
  const params = new URLSearchParams();

  params.append("page", page.toString());

  params.append("archived", "false");

  if (product) {
    params.append("name", product);
  }

  if (archived !== undefined) {
    params.append("archived", archived.toString());
  }

  if (category_id) {
    params.append("category_id", category_id);
  }

  const queryString = params.toString();
  const url = `/products${queryString ? `?${queryString}` : ""}`;

  const response = ApiService.GET({
    url,
  });

  return response;
}
