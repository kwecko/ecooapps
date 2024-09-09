
import { ExceptionReturn, SuccessReturn } from "@shared/core/UseCase";
import { ActionHandler } from "../..";
import { FarmDTO } from "@shared/domain/dtos/farm-dto";

interface SearchOfferingFarmsFetchData {
  cycle_id: string;
  page: number;
  product?: string;
}

export const searchOfferingFarms: ActionHandler<
  SearchOfferingFarmsFetchData,
  Promise<FarmDTO[]>
> = async (data, useCases) => {
  const result = await useCases["search-offering-farms"].execute({
    cycle_id: data.cycle_id,
    page: data.page,
    product: data.product,
  });

  if (result instanceof ExceptionReturn) {
    throw new Error(result.message);
  }

  return (result as SuccessReturn<any>).data;
};
