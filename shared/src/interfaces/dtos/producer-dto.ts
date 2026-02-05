export type Role = "USER" | "PRODUCER" | "MANAGER" | "BROKER";

export interface ProducerDTO {
  id?: string;
  first_name: string;
  last_name: string;
  photo: string | null;
  cpf: string;
  email: string;
  phone: string;
  name: string;
  tally: string;
}
