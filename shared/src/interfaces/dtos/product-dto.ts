export interface ProductDTO {
  id: string;
  name: string;
  image: string;
  pricing: "UNIT" | "WEIGHT";
  archived: boolean;
  created_at: Date;
  updated_at: Date | null;
}
