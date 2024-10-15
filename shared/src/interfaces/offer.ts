import { OfferWithProductDTO } from '@shared/domain/dtos/offer-with-product-dto';


export interface IPendingDeliveries {
  id: string;
  bag_id: string;
  offer: OfferWithProductDTO;
  status: string;
  amount: number;
  created_at: string;
  updated_at: any;
}