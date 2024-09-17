export interface FarmOrders {
  id: string;
  status: "PENDING" | "CANCELLED" | "VERIFIED";
  catalog: Catalog;
  created_at: string;
  updated_at: any;
  orders: Order[];
}

export interface Catalog {
  id: string;
  cycle_id: string;
  farm: Farm;
  created_at: string;
  updated_at: any;
}

export interface Farm {
  id: string;
  name: string;
  caf: string;
  active: boolean;
  tax: number;
  admin: Admin;
  created_at: string;
  updated_at: any;
}

export interface Admin {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  created_at: string;
  updated_at: any;
}

export interface Order {
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
