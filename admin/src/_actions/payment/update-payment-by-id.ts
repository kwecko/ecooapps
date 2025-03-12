"use server";

import ApiService from "@shared/service";

interface UpdatePaymentByIdRequest {
  paymentId: string;
  data: {
    status: "PENDING" | "DONE" | "FAILED";
    method: "CREDIT" | "DEBIT" | "CASH" | "PIX";
    flag?: "VISA" | "MASTERCARD" | "OTHER" | null;
  };
}

export async function updatePaymentById({ paymentId, data }: UpdatePaymentByIdRequest) {
  const url = `/payments/${paymentId}`;

  const response = ApiService.PATCH({
    url,
    data,
  });

  return response;
}
