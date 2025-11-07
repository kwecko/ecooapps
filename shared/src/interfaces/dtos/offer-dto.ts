import { CatalogDTO, ProductDTO, FarmDTO } from "@shared/interfaces/dtos";

export interface OfferDTO {
  id: string;
  amount: number;
  price: number;
  subtotal: number;
	fee: number;
  description: string | null;
  comment: string | null;
  expires_at: Date | undefined;
  active: boolean;
  opens_at: Date;
  closes_at: Date;
  farm_id: string;
  farm: FarmDTO;
  catalog_id: string;
  catalog: CatalogDTO;
  cycle_id: string;
  market_id: string;
  product_id: string;
  product: ProductDTO;
  created_at: Date;
  updated_at: Date | null;
  recurring: string;
}