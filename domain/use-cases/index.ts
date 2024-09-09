import { registerUseCases } from "@shared/core/UseCase";
import { inMemoryStubStore } from "@shared/interfaces/in-memory-stub-store";
import { nextCookiesStubStore } from "@shared/next/nextCookiesStubStore";

import { createAccount } from "./create-user";
import { getUser } from "./get-user";
import { loginCDD } from "./login-cdd";
import { loginAgribusiness } from "./login-agribusiness";
import { registerAgribusiness } from "./register-agribusiness";
import { loginGeneric } from "./login-generic";
import { getCycles } from "./get-cycles";
import { searchOfferingFarms } from "./offers/search-offering-farms";
import { listFarmsWithOrders } from "./orders/list-farms-with-orders";
import { listFarmOrders } from "./orders/list-farm-orders";
import { handleOrdersDelivery } from "./orders/handle-orders-delivery";

const HANDLERS = {
  "create-user": createAccount,
  "get-user": getUser,
  "get-cycles": getCycles,
  "login-cdd": loginCDD,
  "login-agribusiness": loginAgribusiness,
  "login-generic": loginGeneric,
  "register-agribusiness": registerAgribusiness,
  "search-offering-farms": searchOfferingFarms,
  "list-farms-with-orders": listFarmsWithOrders,
  "list-farm-orders": listFarmOrders,
  "handle-orders-delivery": handleOrdersDelivery,
};

const defineStubbedCases = (): Record<string, boolean> => {
  const stubbedCases: Record<string, boolean> = Object.fromEntries(
    Object.keys(HANDLERS).map((key) => [key, false])
  );

  if (process.env.STUBBED_USE_CASES) {
    const keyValuePairs = process.env.STUBBED_USE_CASES.split(",");

    keyValuePairs.forEach((pair) => {
      const [key, value] = pair.split("=");
      if (value === "true") stubbedCases[key] = true;
    });
  }

  return stubbedCases;
};

export const USE_CASES = registerUseCases({
  handlers: HANDLERS,
  stubbedCases: defineStubbedCases(),
  stubStore:
    process.env.NODE_ENV === "development"
      ? nextCookiesStubStore
      : inMemoryStubStore,
});
