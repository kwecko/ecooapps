import { OfferDTO } from "@shared/interfaces/dtos";

export interface OrderDTO {
  id: string;
  bag_id: string;
  offer: OfferDTO;
  status: "PENDING" | "CANCELLED" | "RECEIVED";
  amount: number;
  created_at: Date;
  updated_at: Date | null;
}
