import { cookies } from "next/headers";

import { ExceptionReturn, SuccessReturn } from "@shared/core/UseCase";
import { ActionHandler } from "../..";
import { FarmDTO } from "@shared/domain/dtos/farm-dto";

export const listFarmsWithOrders: ActionHandler<
  { cycle_id: string; page: number; name?: string },
  Promise<FarmDTO[]>
> = async (data, useCases) => {
  const result = await useCases["list-farms-with-orders"].execute({
    access_token: cookies().get("token")?.value as string,
    cycle_id: data.cycle_id,
    page: data.page,
    name: data.name,
  });

  if (result instanceof ExceptionReturn) {
    throw new Error(result.message);
  }

  return (result as SuccessReturn<any>).data;
};
