import { SuccessReturn, UseCaseHandler } from "@shared/core/UseCase";
import { ecooAPIHTTPProvider } from "@shared/interfaces/ecoo-api-http-provider";

export interface CycleData {
  id: string;
  alias: string;
  offer: number[];
  order: number[];
  deliver: number[];
}

export const getCycles: UseCaseHandler<
  { access_token: string },
  CycleData[]
> = async ({ access_token }, stubbed) => {
  if (stubbed) {
    return new SuccessReturn([
      {
        id: "1",
        alias: "Ciclo",
        offer: [1, 7],
        order: [2, 3, 4],
        deliver: [5, 6],
      },
    ]);
  }

  const cycles = (await ecooAPIHTTPProvider.getCycles(access_token)).data;

  return new SuccessReturn(cycles);
};