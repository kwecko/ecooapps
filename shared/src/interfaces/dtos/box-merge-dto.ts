import { BoxDTO, OrderMergeDTO } from "@shared/interfaces/dtos";

export interface BoxMergeDTO extends BoxDTO {
  orders: OrderMergeDTO[];
}
