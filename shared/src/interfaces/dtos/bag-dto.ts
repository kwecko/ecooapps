import {
  AddressDTO,
  CycleDTO,
  MarketDTO,
  OrderDTO,
  PaymentDTO,
  UserDTO,
} from "@shared/interfaces/dtos";

export interface BagDTO {
  id: string;
  status:
    | "PENDING"
    | "VERIFIED"
    | "MOUNTED"
    | "CANCELLED"
    | "REJECTED"
    | "RECEIVED"
    | "DISPATCHED"
    | "DEFERRED"
    | "FETCH"
    | "FETCHED";
  paid: boolean;
  open: boolean;
  total: number;
  subtotal: number;
  fee: number;
  shipping: number;
  code: string;
  cycle_id: string;
  cycle: CycleDTO;
  market_id: string;
  market: MarketDTO;
  address_id: string;
  address: AddressDTO;
  customer_id: string;
  customer: UserDTO;
  orders: OrderDTO[];
  payment: PaymentDTO;
  payment_id: string | null;
  created_at: string;
  updated_at: string | null;
}
