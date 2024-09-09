import { User } from "@shared/domain/entities/user";
import { FarmDTO } from "@shared/domain/dtos/farm-dto";
import { OrderCompleteDTO } from "@shared/domain/dtos/order-complete-dto";
import { CycleDTO } from "@shared/domain/dtos/cycle-dto";

export type GenericStatusCodes = 400 | 401 | 403 | 409;

export type EcooAPIRouteParams = {
  registerUser: [
    user_data: {
      email: string;
      phone: string;
      first_name: string;
      last_name: string;
      password: string;
      cpf: string;
    }
  ];
  authenticateUser: [user_data: { email: string; password: string }];
  getProducts: [access_token: string];
  getUser: [access_token: string];
  getCycles: [access_token: string];
  registerAgribusiness: [
    agribusiness_data: { caf: string; name: string },
    access_token: string
  ];
  searchOfferingFarms: [cycle_id: string, page: number, product?: string];
  listFarmsWithOrders: [
    access_token: string,
    cycle_id: string,
    page: number,
    name?: string
  ];
  listFarmOrders: [access_token: string, farm_id: string, cycle_id: string];
  handleOrdersDelivery: [
    access_token: string,
    body: {
      cycle_id: string;
      farm_id: string;
      status: "RECEIVED" | "CANCELLED";
    }
  ];
};

export interface IEcooAPI {
  registerUser: (
    ...params: EcooAPIRouteParams["registerUser"]
  ) => Promise<{ status: 201; data: EcooAPIRouteParams["registerUser"][0] }>;
  authenticateUser: (
    ...params: EcooAPIRouteParams["authenticateUser"]
  ) => Promise<{ status: 200; data: { token: string } }>;
  getUser: (...params: EcooAPIRouteParams["getUser"]) => Promise<{
    status: 200;
    data: {
      first_name: User["first_name"];
      last_name: User["last_name"];
      email: User["email"];
      roles: User["roles"];
    };
  }>;
  getCycles: (...params: EcooAPIRouteParams["getCycles"]) => Promise<{
    status: 200;
    data: any[];
  }>;
  getProducts: (
    ...params: EcooAPIRouteParams["getProducts"]
  ) => Promise<{ status: 200; data: unknown[] }>;
  registerAgribusiness: (
    ...params: EcooAPIRouteParams["registerAgribusiness"]
  ) => Promise<{ status: 201; data: any }>;
  searchOfferingFarms: (
    ...params: EcooAPIRouteParams["searchOfferingFarms"]
  ) => Promise<{ status: 200; data: any }>;
  listFarmsWithOrders: (
    ...params: EcooAPIRouteParams["listFarmsWithOrders"]
  ) => Promise<{ status: 200; data: FarmDTO[] }>;
  listFarmOrders: (...params: EcooAPIRouteParams["listFarmOrders"]) => Promise<{
    status: 200;
    data: {
      farm: FarmDTO;
      orders: OrderCompleteDTO[];
    };
  }>;
  handleOrdersDelivery: (
    ...params: EcooAPIRouteParams["handleOrdersDelivery"]
  ) => Promise<{ status: 204; data: any }>;
}
