"use server";

import axios from "axios";

export interface Cycle {
  id: string;
  alias: string;
  offer: number[];
  order: number[];
}

export async function fetchCycles() {
  const data = await axios.get(`${process.env.API_URL}/cycles`);

  if (!data.data) {
    return [];
  }

  return data.data as Cycle[];
}
