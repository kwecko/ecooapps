"use server";

import { cookies } from "next/headers";

export async function ListBagsReport(cycle_id: string) {
  const token = cookies().get("cdd_token");

  if (!token) {
    return "Erro";
  }

  try {
    const response = await fetch(`${process.env.API_URL}/bags/report?cycle_id=${cycle_id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token.value}`, 
        'Accept': 'application/pdf',
        'Content-Type': 'application/json'
      }
    });

    
    if (!response.ok) {
      return response.json();
    }

    const data = await response.arrayBuffer();

    return data;
  } catch (error) {
    return {
      message: "Erro desconhecido."
    }
  }
}
