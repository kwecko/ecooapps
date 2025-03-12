export interface ProductDTO {
  id: string;
  name: string;
  image: string;
  pricing: "UNIT" | "WEIGHT";
  category: Category;
  category_id: string;
  created_at: Date;
  updated_at: Date | null;
  perishable: boolean;
}

interface Category {
  id: string;
  name: string;
  created_at: string;
  updated_at: string | null;
}