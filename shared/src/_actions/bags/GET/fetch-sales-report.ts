"use server";
import ApiService from "@shared/service";

interface FetchSalesReportRequest {
  date_from?: string;
  date_to?: string;
}

export async function fetchSalesReport({
  date_from,
  date_to,
}: FetchSalesReportRequest) {
  try {
    const params = new URLSearchParams();

    params.append("type", "spreadsheet");
    if (date_from) {
      params.append("since", date_from);
    }

    if (date_to) {
      params.append("before", date_to);
    }

    const queryString = params.toString();
    const url = `/reports/sales${queryString ? `?${queryString}` : ""}`;

    const response = await ApiService.GET({
      url,
      headers: {
        Accept:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Tipo de resposta para o Excel
        "Content-Type": "application/json",
      },
      responseType: "arraybuffer",
    });

    return response;
  } catch (error) {
    return {
      message: "Erro desconhecido.",
    };
  }
}
