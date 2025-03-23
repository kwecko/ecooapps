'use server';

import ApiService from '@shared/service';

interface ListProductsRequest {
  product: string;
  page: number;
}

export async function listProducts({ product, page }: ListProductsRequest) {
  const params = new URLSearchParams();

  params.append("page", page.toString());

  if (product) {
    params.append("name", product);
  }

  const queryString = params.toString();
  const url = `/products${queryString ? `?${queryString}` : ""}`;

  const response = ApiService.GET({
    url,
  });

  return response;

}
