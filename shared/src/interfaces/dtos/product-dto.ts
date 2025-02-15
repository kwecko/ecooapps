export interface ProductDTO {
  id: string;
  name: string;
  image: string;
  pricing: "UNIT" | "WEIGHT";
  category: "24538b64-06b5-4bab-ad94-72667ef52633" | "1ead891c-4690-4499-92c2-e5d6655893b7";
  archived: boolean;
  created_at: Date;
  updated_at: Date | null;
}
