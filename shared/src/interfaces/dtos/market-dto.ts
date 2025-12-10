export interface MarketDTO {
  id: string;
  name: string;
  open: boolean;
  description: string | null;
  offers_total: number;
  bags_total: number;
  created_at: string;
  updated_at: string | null;
}

