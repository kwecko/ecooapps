import { BagDTO, OrderMergeDTO } from "@shared/interfaces/dtos";

export interface BagMergeDTO extends BagDTO {
  orders: OrderMergeDTO[];
  code: string;
  paid: boolean;
  price: number;
}
