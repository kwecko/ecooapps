import { cookies } from "next/headers";

import { ExceptionReturn, SuccessReturn } from "@shared/core/UseCase";
import { ActionHandler } from "../..";
import { FarmDTO } from "@shared/domain/dtos/farm-dto";
import { OrderCompleteDTO } from "@shared/domain/dtos/order-complete-dto";

export const listFarmOrders: ActionHandler<
  { farm_id: string; cycle_id: string },
  Promise<{ farm: FarmDTO; orders: OrderCompleteDTO[] }>
> = async (data, useCases) => {
  const result = await useCases["list-farm-orders"].execute({
    access_token: cookies().get("token")?.value as string,
    farm_id: data.farm_id,
    cycle_id: data.cycle_id,
  });

  if (result instanceof ExceptionReturn) {
    throw new Error(result.message);
  }

  return (result as SuccessReturn<any>).data;
};
