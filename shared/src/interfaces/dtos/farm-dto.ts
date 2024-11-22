import { UserDTO } from "@shared/interfaces/dtos";

export interface FarmDTO {
  id: string;
  name: string;
  status: "PENDING" | "ACTIVE" | "INACTIVE";
  tally: string;
  tax: number;
  description: string | null;
  admin: UserDTO;
  created_at: Date;
  updated_at: Date | null;
}
