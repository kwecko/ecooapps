"use server";

import axios from "axios";
import { CatalogMergeDTO } from "@shared/domain/dtos/catalog-dto";

export async function fetchCatologsById(
  catalog_id: string | undefined,
  cycle_id: string | undefined,
  page: number = 1,
  product: string = ""
) {
  if (!cycle_id) return null;

  const response = await axios
    .get(
      `${process.env.API_URL}/catalogs/${catalog_id}?product=${product}&page=${page}`
    )
    .catch((error) => {
      console.error("error");
      console.error(error);
    });

  if (!response?.data) {
    return null;
  }

  return response.data as CatalogMergeDTO | null;
}
