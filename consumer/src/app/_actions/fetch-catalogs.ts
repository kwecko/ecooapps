"use server";

import axios from "axios";


export interface Admin {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  created_at: string
  updated_at: string
}

export interface Farm {
  id: string
  name: string
  caf: string
  active: boolean
  admin: Admin
  tax: number
  created_at: string
  updated_at: string
}

export interface Catalog {
  id: string,
  cycle_id: string,
  farm: Farm,
  created_at: string
  updated_at: string

}


export async function fetchCatalogs(cycle_id: string | undefined, page: number = 1, product: string = "") {

  if(!cycle_id) return [];
  
  const response = await axios.get(
    `${process.env.API_URL}/catalogs?cycle_id=${cycle_id}&product=${product}&page=${page}`,
  )

  if(!response?.data){
    return []
  }

  return response.data as Catalog[];
}
