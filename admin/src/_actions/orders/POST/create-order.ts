"use server";

import ApiService from "@shared/service";

interface OrderItem {
  offer_id: string;
  amount: number;
}

interface CreateOrderRequest {
  cycle_id?: string;
  market_id?: string;
  user_id?: string;
  address?: {
    street: string;
    number: string;
    neighborhood: string;
    postal_code: string;
    complement?: string;
  };
  orders: OrderItem[];
}

export async function createOrder(data: CreateOrderRequest) {
  const response = ApiService.POST({
    url: "/orders",
    data,
  });

  return response;
}
