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
  price: number;
  code: string;
  cycle_id: string;
  cycle: CycleDTO;
  address_id: string;
  address: AddressDTO;
  user_id: string;
  user: UserDTO;
  orders: OrderDTO[];
  payments: PaymentDTO[];
  created_at: string;
  updated_at: string | null;
}
