export interface BagOrder {
  id: string;
  status: string;
  cycle_id: string;
  address: string;
  user: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    roles: string[];
    verified_at: Date; 
    created_at: Date; 
    updated_at: Date | null;
  };
  created_at: string;
  updated_at: string | null;
  orders: {
    id: string;
    bag_id: string;
    status: string;
    amount: number;
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
        pricing: string;
        image: string;
        created_at: Date;
        updated_at: Date | null;
      };
    };
  }[];
}