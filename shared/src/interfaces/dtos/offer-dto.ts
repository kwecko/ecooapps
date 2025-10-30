import { CatalogDTO, FarmDTO, ProductDTO } from "@shared/interfaces/dtos";

export interface OfferDTO {
  id: string;
  amount: number;
  price: number;
	fee: number;
	total: number;
  description: string | null;
  comment: string | null;
	farm_id: string;
	farm: FarmDTO;
	market_id: string | null;
  product_id: string;
  product: ProductDTO;
  created_at: Date;
  updated_at: Date | null;
  expires_at: Date | undefined;
  recurring: string;
  closes_at: Date;
}