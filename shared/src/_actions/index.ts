import { USE_CASES } from "@shared/domain/use-cases";

import {
  registerActions,
  type ActionHandler as ActionHandlerWithoutCases,
} from "@shared/next/Action";

import { registerAgribusiness } from "./register-agribusiness/handler";
import { createAccount } from "./account/create-account/handler";
import { getCycles } from "./cycles/handler";
import { searchOfferingFarms } from "./offers/search-offering-farms/handler";
import { listFarmsWithOrders } from "./orders/list-farms-with-orders/handler";
import { listFarmOrders } from "./orders/list-farm-orders/handler";
import { handleOrdersDelivery } from "./orders/handle-orders-delivery/handler";

export type ActionHandler<T, U> = ActionHandlerWithoutCases<
  T,
  U,
  typeof USE_CASES
>;

export const ACTIONS = registerActions({
  handlers: {
    "create-account": createAccount,
    "get-cycles": getCycles,
    "register-agribusiness": registerAgribusiness,
    "search-offering-farms": searchOfferingFarms,
    "list-farms-with-orders": listFarmsWithOrders,
    "list-farm-orders": listFarmOrders,
    "handle-orders-delivery": handleOrdersDelivery,
  },
  useCases: USE_CASES,
});
