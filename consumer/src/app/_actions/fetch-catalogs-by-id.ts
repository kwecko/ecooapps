"use server";

import axios from "axios";
import { Farm } from "./fetch-catalogs";

export interface Product {
  id: string
  image: string
  name: string
  pricing: "UNIT" | "WEIGHT"
  created_at: string
  updated_at: string
}

export interface Offer {
  id: string
  catalog_id: string
  cycle_id: string
  price: number
  amount: number
  product: Product
  description: string
  created_at: string
  updated_at: string
  expandDescription?: boolean
}

export interface CatalogOffers {
  id: string,
  cycle_id: string,
  farm: Farm,
  created_at: string
  updated_at: string
  offers: Offer[]

}


export async function fetchCatologsById(catalog_id: string | undefined, cycle_id: string | undefined, page: number = 1, product: string = "") {

  if (!cycle_id) 
    return null;

  const response = await axios.get(
    `${process.env.API_URL}/catalogs/${catalog_id}?cycle_id=${cycle_id}&product=${product}&page=${page}`,
  ).catch((error) => {
    console.error("error")
    console.error(error)
  });

  if (!response?.data) {
    return null
  }


  return response.data as CatalogOffers | null;
}
