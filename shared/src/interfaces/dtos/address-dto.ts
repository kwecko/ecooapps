export interface AddressDTO {
  id: string;
  complement: string | null;
  number: string;
  street: string;
  postal_code: string;
  created_at: Date;
  updated_at: Date | null;
}
