"use server";
import { cookies } from "next/headers";

export interface Products {
  id: string;
  name: string;
  image: string;
  pricing: string;
}

interface GetProductsProps {
  product: string;
  page: number;
}

export async function GetProducts({
  product,
  page,
}: GetProductsProps): Promise<{ data: Products[] }> {
  const token = cookies().get("token")?.value;

  if (token) {
    try {
      const response = await fetch(
        `${process.env.API_URL}/products?page=${page}&product=${product}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      return {
        data: data as Products[],
      };
    } catch (error) {
      console.error("Erro ao fazer a chamada à API:", error);
    }
  }

  return {
    data: [] as Products[],
  };
}
