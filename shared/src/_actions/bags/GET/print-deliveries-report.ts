"use server";

import { cookies } from "next/headers";

interface PrintDeliveriesReportRequest {
  cycle_id?: string;
  withdraw?: boolean;
  type?: string;
}

export async function printDeliveriesReport({
  cycle_id,
  withdraw,
  type = "pdf",
}: PrintDeliveriesReportRequest) {
  const token = cookies().get("cdd_token");

  if (!token) {
    return "Erro";
  }

  try {
    const queryParams = new URLSearchParams();

    if (cycle_id) {
      queryParams.append("cycle_id", cycle_id);
    }

    if (withdraw !== undefined) {
      queryParams.append("withdraw", withdraw ? "true" : "false");
    }

    queryParams.append("type", type);
    
    const response = await fetch(
      `${process.env.API_URL}/reports/sales?${queryParams.toString()}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token.value}`,
          Accept: "application/pdf",
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      return response.json();
    }

    return await response.arrayBuffer();
  } catch (error) {
    return { message: "Erro desconhecido." };
  }
}