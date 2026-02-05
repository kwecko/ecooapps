import { OrderDTO, FarmDTO } from "@shared/interfaces/dtos";

export interface BoxDTO {
  id: string;
  status: "PENDING" | "CANCELLED" | "VERIFIED" | "REJECTED";
  verified: number;
  cycle_id: string;
  farm_id: string;
  farm: FarmDTO;
  orders: OrderDTO[];
  created_at: Date;
  updated_at: Date | null;
}