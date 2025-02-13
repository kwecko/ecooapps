"use server";

import { cookies } from "next/headers";

interface PrintDeliveriesReportRequest {
  cycle_id?: string;
  since?: string
  before?: string
}

export async function fetchInboundReports({
  cycle_id,
  since,
  before
}: PrintDeliveriesReportRequest) {
  const token = cookies().get("cdd_token");

  if (!token) {
    return "Erro";
  }

  console.log(cycle_id)

  console.log(since)
  console.log(before)

  try {
    const queryParams = new URLSearchParams();

    if (cycle_id) {
      queryParams.append("cycle_id", cycle_id);
    }

    if (since) {
      queryParams.append("since", since);
    }

    if (before) {
      queryParams.append("before", before);
    }

    const response = await fetch(
      `${process.env.API_URL}/reports/inbound?${queryParams.toString()}`,
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

    const data = await response.arrayBuffer();

    return data;
  } catch (error) {
    return {
      message: "Erro desconhecido.",
    };
  }
}