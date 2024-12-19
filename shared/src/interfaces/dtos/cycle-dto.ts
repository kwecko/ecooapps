export interface CycleDTO {
  id: string;
  alias: string;
  offer: number[];
  order: number[];
  deliver: number[];
  created_at: Date;
  updated_at: Date | null;
}
