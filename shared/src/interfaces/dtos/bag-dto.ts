import {
  AddressDTO,
  CycleDTO,
  OrderDTO,
  PaymentDTO,
  UserDTO,
} from "@shared/interfaces/dtos";

export interface BagDTO {
  id: string;
  status:
    | "PENDING"
    | "CANCELLED"
    | "RECEIVED"
    | "SEPARATED"
    | "DISPATCHED"
    | "DEFERRED";
  paid: boolean;
  open: boolean;
  total: number;
  subtotal: number;
  fee: number;
  shipping: number;
  code: string;
  cycle_id: string;
  cycle: CycleDTO;
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
