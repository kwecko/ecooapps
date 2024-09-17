export interface Boxes {
  id: string;
  status: "PENDING" | "CANCELLED" | "VERIFIED";
  catalog: Catalog;
  created_at: string;
  updated_at: any;
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
  updated_at: string;
}
