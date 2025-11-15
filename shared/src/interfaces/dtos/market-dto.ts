import { BagDTO, OfferDTO } from "@shared/interfaces/dtos";

export interface MarketDTO {
  id: string;
  name: string;
  open: boolean;
  description: string | null;
  offers: OfferDTO[];
  bags?: BagDTO[];
  created_at: string;
  updated_at: string | null;
}

