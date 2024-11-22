"use server";

import { fetchCurrentCatalog } from "./fetch-current-catalog";
import { fetchLastCatalog } from "./fetch-last-catalog";

interface FetchCatalogRequest {
  cycle_id: string;
  type: "last" | "current";
  page: number;
}

export async function fetchCatalog({
  cycle_id,
  type,
  page,
}: FetchCatalogRequest) {
  const types: Record<string, Function> = {
    last: fetchLastCatalog,
    current: fetchCurrentCatalog,
  };

  return types[type]({ cycle_id, page });
}
