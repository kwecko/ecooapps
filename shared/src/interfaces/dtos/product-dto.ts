export interface ProductDTO {
  id: string;
  name: string;
  image: string;
  pricing: "UNIT" | "WEIGHT";
  category: CategoryDTO;
  category_id: string;
  created_at: Date;
  updated_at: Date | null;
  perishable: boolean;
  archived: boolean;
}

export interface CategoryDTO {
  id: string;
  name: string;
	image: string;
  created_at: string;
  updated_at: string | null;
}