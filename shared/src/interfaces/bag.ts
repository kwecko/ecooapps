export interface Bag {
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
  created_at: Date;
  updated_at: Date | null;
}