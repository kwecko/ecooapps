import { CatalogDTO, OrderDTO } from "@shared/interfaces/dtos";

export interface BoxDTO {
  id: string;
  status: "PENDING" | "CANCELLED" | "VERIFIED";
  verified: number;
  catalog_id: string;
  catalog: CatalogDTO;
  orders: OrderDTO[];
  created_at: Date;
  updated_at: Date | null;
}
