import { OfferDTO } from "@shared/interfaces/dtos";

export interface OrderDTO {
  id: string;
  status: "PENDING" | "CANCELLED" | "RECEIVED";
  amount: number;
  bag_id: string;
  box_id: string;
  offer_id: string;
  offer: OfferDTO;
  created_at: Date;
  updated_at: Date | null;
}
