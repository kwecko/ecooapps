import { IFarm } from "./farm";

export interface IPendingDeliveries {
  id: string;
  bag_id: string;
  offer: IOfferWithProduct;
  status: string;
  amount: number;
  created_at: string;
  updated_at: any;
}

export interface IOffer {
  id: string;
  amount: number;
  price: number;
  description: any;
  catalog_id: string;
  product: IProduct;
  created_at: Date;
  updated_at: Date | null;
}

export interface IProduct {
  id: string;
  name: string;
  pricing: "UNIT" | "WEIGHT";
  image: string;
  created_at: Date;
  updated_at: Date | null;
}

export interface IOfferWithProduct {
  id: string;
  price: number;
  amount: number;
  description: string | null;
  catalog_id: string;
  farm: IFarm;
  product_id: string;
  created_at: Date;
  updated_at: Date | null;
  product: IProduct;
}
