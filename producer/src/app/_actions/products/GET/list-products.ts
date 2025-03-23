'use server';

import ApiService from '@shared/service';

interface ListProductsRequest {
  page: number;
  product?: string;
  archived?: boolean | undefined;
}

export async function listProducts({ page, product, archived }: ListProductsRequest) {
  const params = new URLSearchParams();

  params.append("page", page.toString());

  if (product) {
    params.append("name", product);
  }

  if (archived !== undefined) {
    params.append("archived", archived.toString());
  }

  const queryString = params.toString();
  const url = `/products${queryString ? `?${queryString}` : ""}`;

  const response = ApiService.GET({
    url,
  });

  return response;
}
