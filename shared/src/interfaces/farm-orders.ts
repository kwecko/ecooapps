export interface FarmOrders {
  id: string;
  name: string;
  caf: string;
  active: boolean;
  admin_id: string;
  tax: number;
  created_at: Date;
  updated_at: Date | null;
  orders: {
    id: string;
    bag_id: string;
    amount: number;
    status: "PENDING" | "SEPARATED" | "DISPATCHED";
    created_at: Date;
    updated_at: Date | null;
    offer: {
      id: string;
      farm_id: string;
      cycle_id: string;
      price: number;
      amount: number;
      description: string | null;
      created_at: Date;
      updated_at: Date | null;
      product: {
        id: string;
        name: string;
        pricing: "UNIT" | "WEIGHT";
        image: string;
        created_at: Date;
        updated_at: Date | null;
      };
    };
  }[];
}