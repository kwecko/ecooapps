"use server";

import { cookies } from "next/headers";

interface PrintDeliveriesReportRequest {
  cycle_id?: string;
  withdraw?: boolean;
  type?: string;
  since?: string;
  before?: string;
}

export async function printDeliveriesReport({
  cycle_id,
  withdraw,
  type = "pdf",
  since,
  before
}: PrintDeliveriesReportRequest) {
  const token = cookies().get("cdd_token");

  if (!token) {
    return "Erro";
  }

  try {
    const queryParams = new URLSearchParams();

    if (since) queryParams.append("since", since);

    if (before) queryParams.append("before", before);

    if (cycle_id) {
      queryParams.append("cycle_id", cycle_id);
    }

    if (withdraw) {
      queryParams.append("withdraw", "true");
    } else {
      queryParams.append("withdraw", "false");
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