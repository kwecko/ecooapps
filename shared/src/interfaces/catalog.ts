import { IFarm } from "./farm";
import { IOfferWithProduct } from "./offer";

export interface ICatalog {
  id: string;
  cycle_id: string;
  farm: IFarm;
  created_at: Date;
  updated_at: Date | null;
}

export interface ICatalogMerge {
  id: string;
  cycle_id: string;
  farm: IFarm;
  created_at: Date;
  updated_at: Date | null;
  offers: IOfferWithProduct[];
}