export interface ListFarmOffersRequest {
  farm_id: string;
  cycle_id: string;
  page: number;
  product?: string;
}