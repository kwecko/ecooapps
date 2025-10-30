import { CycleDTO, FarmDTO, OfferDTO, UserDTO } from "@shared/interfaces/dtos";

export interface CatalogDTO {
  id: string;
	name: string;
	status: "ACTIVE" | "INACTIVE" | "PENDING";
	tally: string;
	photo: string | null;
	images: string[];
	description: string | null;
  fee: number;
  admin_id: string;
  admin: UserDTO;
  offers: OfferDTO[];
  created_at: Date;
  updated_at: Date | null;
}
