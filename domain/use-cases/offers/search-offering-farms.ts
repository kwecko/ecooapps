import { SuccessReturn, UseCaseHandler } from "@shared/core/UseCase";
import { FarmDTO } from "@shared/domain/dtos/farm-dto";
import { ecooAPIHTTPProvider } from "@shared/interfaces/ecoo-api-http-provider";


export const searchOfferingFarms: UseCaseHandler<
  { cycle_id: string; page: number; product?: string },
  FarmDTO[]
> = async ({ cycle_id, page, product }, stubbed) => {
  if (stubbed) {
    const offeringFarms = [
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
    return new SuccessReturn(offeringFarms);
  }

  const offeringFarms = (
    await ecooAPIHTTPProvider.searchOfferingFarms(cycle_id, page, product)
  ).data;

  return new SuccessReturn(offeringFarms);
};
