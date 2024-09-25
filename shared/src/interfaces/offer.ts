export interface IPendingDeliveries {
  id: string;
  bag_id: string;
  offer: Offer;
  status: string;
  amount: number;
  created_at: string;
  updated_at: any;
}

export interface Offer {
  id: string;
  amount: number;
  price: number;
  description: any;
  catalog_id: string;
  product: Product;
  created_at: string;
  updated_at: any;
}

export interface Product {
  id: string;
  name: string;
  image: string;
  pricing: string;
  created_at: string;
  updated_at: any;
}
