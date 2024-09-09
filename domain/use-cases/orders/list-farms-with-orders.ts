import { SuccessReturn, UseCaseHandler } from "@shared/core/UseCase";
import { ecooAPIHTTPProvider } from "@shared/interfaces/ecoo-api-http-provider";

import { FarmDTO } from "@shared/domain/dtos/farm-dto";

export const listFarmsWithOrders: UseCaseHandler<
  { access_token: string; cycle_id: string; page: number; name?: string },
  FarmDTO[]
> = async ({ access_token, cycle_id, page, name }, stubbed) => {
  if (stubbed) {
    const farms = [
      {
        id: "1",
        name: "Fazenda",
        caf: "123456",
        active: true,
        admin_id: "1",
        tax: 0.1,
        created_at: new Date(),
        updated_at: null,
      },
      {
        id: "2",
        name: "Fazenda 2",
        caf: "654321",
        active: false,
        admin_id: "2",
        tax: 0.2,
        created_at: new Date(),
        updated_at: null,
      },
    ];
    return new SuccessReturn(farms);
  }

  const farmsWithOrders = (
    await ecooAPIHTTPProvider.listFarmsWithOrders(
      access_token,
      cycle_id,
      page,
      name
    )
  ).data;

  return new SuccessReturn(farmsWithOrders);
};
