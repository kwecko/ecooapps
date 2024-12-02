import { FarmDTO } from "@shared/interfaces/dtos";

export interface CatalogDTO {
  id: string;
  cycle_id: string;
  farm: FarmDTO;
  created_at: Date;
  updated_at: Date | null;
}
