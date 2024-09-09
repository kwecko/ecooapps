import { SuccessReturn, UseCaseHandler } from "@shared/core/UseCase";
import { ecooAPIHTTPProvider } from "@shared/interfaces/ecoo-api-http-provider";

export const handleOrdersDelivery: UseCaseHandler<
  {
    access_token: string;
    body: {
      cycle_id: string;
      farm_id: string;
      status: "RECEIVED" | "CANCELLED";
    };
  },
  { success: boolean }
> = async ({ access_token, body }, stubbed) => {
  if (stubbed) {
    return new SuccessReturn({
      success: true,
    });
  }

  const response = (
    await ecooAPIHTTPProvider.handleOrdersDelivery(access_token, body)
  ).data;

  return new SuccessReturn({
    success: response.status == 204,
  });
};

