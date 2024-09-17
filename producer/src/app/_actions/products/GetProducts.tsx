"use server";
import { cookies } from "next/headers";
import { ProductDTO } from "@shared/domain/dtos/product-dto";


interface GetProductsProps {
  product: string;
  page: number;
}

export async function GetProducts({
  product,
  page,
}: GetProductsProps): Promise<{ data: ProductDTO[] }> {
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
        data: data as ProductDTO[],
      };
    } catch (error) {
      console.error("Erro ao fazer a chamada à API:", error);
    }
  }

  return {
    data: [] as ProductDTO[],
  };
}
