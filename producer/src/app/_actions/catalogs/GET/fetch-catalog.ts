"use server";

import { fetchCurrentCatalog } from "./fetch-current-catalog";
import { fetchLastCatalog } from "./fetch-last-catalog";

interface FetchCatalogRequest {
  cycle_id: string;
  type: "last" | "current";
  farm_id?: string;
  since?: string;
  page: number;
}

export async function fetchCatalog({
  cycle_id,
  type,
  farm_id,
  since,
  page,
}: FetchCatalogRequest) {
  const types: Record<string, Function> = {
    last: fetchLastCatalog,
    current: fetchCurrentCatalog,
  };

  return types[type]({ cycle_id, page, since, farm_id });
}