import { ICatalog } from "./catalog";
import { IOrder } from "./order";
import { IAdmin } from "./user";

export interface IBoxes {
  id: string;
  status: "PENDING" | "VERIFIED";
  catalog: ICatalog;
  created_at: Date;
  updated_at: Date | null;
  verified: number;
}

export interface IFarm {
  id: string;
  name: string;
  tally: string;
  active: boolean;
  tax: number;
  description?: string;
  admin: IAdmin;
  created_at: Date;
  updated_at: Date | null;
}

export interface IFarmOrders {
  id: string;
  verified: number;
  catalog: ICatalog;
  created_at: Date;
  updated_at: Date | null;
  orders: IOrder[];
}

export interface IUpdateFarm {
  name: string;
  tally: string;
  description?: string;
}
