export type Role = "USER" | "PRODUCER" | "MANAGER" | "BROKER";

export interface UserDTO {
  id: string;
  first_name: string;
  last_name: string;
  photo: string | null;
  cpf: string;
  email: string;
  phone: string;
  admin: boolean;
  roles: Role[];
  verified_at: Date | null;
  created_at: Date;
  updated_at: Date | null;
}
