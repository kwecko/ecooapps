"use server";

import { cookies } from "next/headers";

interface PrintOffersReportRequest {
  cycle_id?: string;
  since?: string;
  before?: string;
}

export async function printOffersReport({
  cycle_id,
  since,
  before
}: PrintOffersReportRequest) {
  const token = cookies().get("cdd_token");

  if (!token) {
    return "Erro";
  }

  try {
    const queryParams = new URLSearchParams();

    if (cycle_id) queryParams.append("cycle_id", cycle_id);

    if (since) queryParams.append("since", since);

    if (before) queryParams.append("before", before);

    queryParams.append("offers", "true");

    console.log(
      "Simulação de fetch:",
      `${process.env.API_URL}/reports?${queryParams.toString()}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token.value}`,
          Accept: "application/pdf",
          "Content-Type": "application/json",
        },
      }
    );

    return {
      data: "Simulação de dados de ofertas",
      message: "Relatório gerado com sucesso",
    };
  } catch (error) {
    return {
      message: "Erro desconhecido.",
    };
  }
}