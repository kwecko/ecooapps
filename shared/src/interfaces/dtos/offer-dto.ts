import { ProductDTO } from "@shared/interfaces/dtos";

export interface OfferDTO {
  id: string;
  amount: number;
  price: number;
  description: string | null;
  catalog_id: string;
  product: ProductDTO;
  created_at: Date;
  updated_at: Date | null;
}