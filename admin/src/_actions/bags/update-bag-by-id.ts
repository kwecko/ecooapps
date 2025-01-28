"use server";

import ApiService from "@shared/service";

interface UpdateBagByIdRequest {
  bagId: string;
  data: {
    status?:
      | "PENDING"
      | "SEPARATED"
      | "DISPATCHED"
      | "RECEIVED"
      | "CANCELLED"
      | "DEFERRED";
    payments?: {
      id: string;
      status: "PENDING" | "DONE" | "FAILED";
      method: "CREDIT" | "DEBIT" | "CASH" | "PIX";
      flag?: "VISA" | "MASTERCARD" | "OTHER" | null;
    }[];
  };
}

export async function updateBagById({ bagId, data }: UpdateBagByIdRequest) {
  const url = `/bags/${bagId}/handle`;

  const response = ApiService.PATCH({
    url,
    data,
  });

  return response;
}
