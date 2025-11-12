"use server";

import { fetchCurrentCatalog } from "./fetch-current-catalog";
import { fetchLastCatalog } from "./fetch-last-catalog";

interface FetchCatalogRequest {
  type: "last" | "current";
  farm_id: string;
  since?: string;
  page: number;
}

export async function fetchCatalog({
  type,
  farm_id,
  since,
  page,
}: FetchCatalogRequest) {
  const types: Record<string, Function> = {
    last: fetchLastCatalog,
    current: fetchCurrentCatalog,
  };

  return types[type]({ farm_id, page, since });
}