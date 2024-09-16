export interface ProductDTO {
    id: string;
    name: string;
    pricing: "UNIT" | "WEIGHT";
    image: string;
    created_at: Date;
    updated_at: Date | null;
}