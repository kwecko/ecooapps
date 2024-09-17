import { ProductDTO } from "./product-dto";

export interface OfferWithProductDTO {
  id: string;
  price: number;
  amount: number;
  description: string | null;
  catalog_id: string;
  product_id: string;
  created_at: Date;
  updated_at: Date | null;
  product: ProductDTO;
}
