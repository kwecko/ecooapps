import { ExceptionReturn, SuccessReturn } from "@shared/core/UseCase";
import { ActionHandler } from "..";
import { cookies } from "next/headers";

interface CycleData {
  id: string;
  alias: string;
  offer: number[];
  order: number[];
  deliver: number[];
  created_at: Date;
  updated_at: Date | null;
};

export const getCycles: ActionHandler<
  {},
  Promise<CycleData[]>
> = async (_data, useCases) => {
  const result = await await useCases["get-cycles"].execute({
    access_token: cookies().get("token")?.value as string,
  });

  if (result instanceof ExceptionReturn) {
    throw new Error(result.message);
  }

  return (result as SuccessReturn<any>).data;
};