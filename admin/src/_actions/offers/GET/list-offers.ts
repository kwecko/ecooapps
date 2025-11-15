"use server";

import ApiService from "@shared/service";

interface ListOffersRequest {
  page: number;
  market_id?: string;
  cycle_id?: string;
  product?: string;
  category_id?: string;
  available?: boolean;
  since?: string;
  before?: string;
}

export async function listOffers({
  page,
  market_id,
  cycle_id,
  product,
  category_id,
  available,
  since,
  before,
}: ListOffersRequest) {
  const params = new URLSearchParams();

  params.append("page", page.toString());

  if (market_id) {
    params.append("market_id", market_id);
  }

  if (cycle_id) {
    params.append("cycle_id", cycle_id);
  }

  if (product) {
    params.append("product", product);
  }

  if (category_id) {
    params.append("category_id", category_id);
  }

  if (available !== undefined) {
    params.append("available", available.toString());
  }

  if (since) {
    params.append("since", since);
  }

  if (before) {
    params.append("before", before);
  }

  const queryString = params.toString();
  const url = `/offers${queryString ? `?${queryString}` : ""}`;

  const response = ApiService.GET({
    url,
  });

  return response;
}

