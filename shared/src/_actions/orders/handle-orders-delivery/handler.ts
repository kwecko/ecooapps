import { cookies } from "next/headers";

import { ExceptionReturn, SuccessReturn } from "@shared/core/UseCase";
import { ActionHandler } from "../..";

export const handleOrdersDelivery: ActionHandler<
  {
    cycle_id: string;
    farm_id: string;
    status: "RECEIVED" | "CANCELLED";
  },
  Promise<{ success: boolean }>
> = async (data, useCases) => {
  const result = await useCases["handle-orders-delivery"].execute({
    access_token: cookies().get("token")?.value as string,
    body: {
      cycle_id: data.cycle_id,
      farm_id: data.farm_id,
      status: data.status,
    },
  });

  if (result instanceof ExceptionReturn) {
    throw new Error(result.message);
  }

  return (result as SuccessReturn<any>).data;
};
