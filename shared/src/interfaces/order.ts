import { IOffer } from "./offer";

export interface IOrder {
  id: string;
  bag_id: string;
  offer: IOffer;
  status: string;
  amount: number;
  created_at: Date;
  updated_at: Date | null;
}