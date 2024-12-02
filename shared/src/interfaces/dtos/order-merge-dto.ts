import { OfferMergeDTO, OrderDTO } from "@shared/interfaces/dtos";

export interface OrderMergeDTO extends Omit<OrderDTO, "offer"> {
  box_id: string;
  offer: OfferMergeDTO;
}
