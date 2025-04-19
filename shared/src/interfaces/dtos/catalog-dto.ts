import { CycleDTO, FarmDTO, OfferDTO } from "@shared/interfaces/dtos";

export interface CatalogDTO {
  id: string;
  cycle_id: string;
  cycle: CycleDTO;
  farm_id: string;
  farm: FarmDTO;
  fee: number;
  offers: OfferDTO[];
  created_at: Date;
  updated_at: Date | null;
}
