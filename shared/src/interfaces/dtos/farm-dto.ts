import { UserDTO } from "@shared/interfaces/dtos";

export interface FarmDTO {
  id: string;
  name: string;
  status: "PENDING" | "ACTIVE" | "INACTIVE";
  tally: string;
	photo: string | null;
	images: string[] | null;
  fee: number;
  description: string | null;
  admin_id: string;
  admin: UserDTO;
  created_at: Date;
  updated_at: Date | null;
}
