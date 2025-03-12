"use server";

import ApiService from "@shared/service";

interface CreatePaymentRequest {
  data: {
    bag_id: string;
    method: "CREDIT" | "DEBIT" | "CASH" | "PIX";
    flag?: "VISA" | "MASTERCARD" | "OTHER" | null;
  };
}

export async function createPayment({ data }: CreatePaymentRequest) {
  const url = `/payments`;

  const response = ApiService.POST({
    url,
    data,
  });

  return response;
}
