import { CatalogDTO } from "@shared/interfaces/dtos";

export interface BoxDTO {
  id: string;
  verified: number;
  status: "PENDING" | "VERIFIED";
  catalog: CatalogDTO;
  created_at: Date;
  updated_at: Date | null;
}
