import { AddressDTO, UserDTO } from "@shared/interfaces/dtos";

export interface BagDTO {
  id: string;
  status:
    | "PENDING"
    | "CANCELLED"
    | "RECEIVED"
    | "SEPARATED"
    | "DISPATCHED"
    | "DEFERRED";
  cycle_id: string;
  address: AddressDTO;
  user: UserDTO;
  created_at: Date;
  updated_at: Date | null;
}
