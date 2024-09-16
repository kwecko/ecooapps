export interface OfferProductRequest {
  cycle_id: string;
  product_id: string;
  amount: number;
  price: number;
  description?: string;
}
