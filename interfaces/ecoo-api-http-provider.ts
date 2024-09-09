import { nextAxios as axios } from "@shared/next/next-axios";

import { USE_CASE_EXCEPTIONS } from "@shared/warnings";

import {
  EcooAPIRouteParams,
  GenericStatusCodes,
  IEcooAPI,
} from "./types/IEcooAPI";

const handleExceptions = (error: {
  response: { status: GenericStatusCodes };
  message: string | null;
}): void => {
  error.message = null;

  if (error.response) {
    const status = error.response.status;

    if (status) {
      if (status === 400) error.message = USE_CASE_EXCEPTIONS["general-1"];
      if (status === 401) error.message = USE_CASE_EXCEPTIONS["general-5"];
      if (status === 403) error.message = USE_CASE_EXCEPTIONS["general-2"];
      if (status === 409) error.message = USE_CASE_EXCEPTIONS["general-3"];
    }
  }

  throw error;
};

const defineServiceMethod = <T extends keyof IEcooAPI>(
  handler: (...params: EcooAPIRouteParams[T]) => ReturnType<IEcooAPI[T]>,
  errorHandler?: (
    error: Error & { response: { status: number } }
  ) => ReturnType<IEcooAPI[T]>
) => {
  return async (...params: EcooAPIRouteParams[T]) => {
    try {
      return await handler(...params);
    } catch (error: any) {
      if (errorHandler) {
        const errorHandlerResponse = errorHandler(error);
        if (errorHandlerResponse) return errorHandlerResponse;
      }

      return handleExceptions(error) as any;
    }
  };
};

export const ecooAPIHTTPProvider: IEcooAPI = {
  registerUser: defineServiceMethod<"registerUser">(async (user_data) => {
    const response = await axios.post(`${process.env.API_URL}/users`, {
      email: user_data.email,
      phone: user_data.phone,
      first_name: user_data.first_name,
      last_name: user_data.last_name,
      password: user_data.password,
      cpf: user_data.cpf,
    });

    return { data: response.data, status: 201 };
  }),

  authenticateUser: defineServiceMethod<"authenticateUser">(
    async (user_data) => {
      const response = await axios.post(
        `${process.env.API_URL}/auth`,
        {
          email: user_data.email,
          password: user_data.password,
          type: "BASIC",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return { data: response.data, status: 200 };
    }
  ),

  getUser: defineServiceMethod<"getUser">(async (access_token) => {
    const response = await axios.get(`${process.env.API_URL}/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });

    return { data: response.data, status: 200 };
  }),

  getCycles: defineServiceMethod<"getCycles">(async (access_token) => {
    const response = await axios.get(`${process.env.API_URL}/cycles`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });

    return {
      data: response.data,
      status: 200,
    };
  }),

  getProducts: defineServiceMethod<"getProducts">(async (access_token) => {
    const response = await axios.get(`${process.env.API_URL}/products/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });

    return { data: response.data, status: 200 };
  }),

  registerAgribusiness: defineServiceMethod<"registerAgribusiness">(
    async (agribusiness_data, access_token) => {
      const response = await axios.post(
        `${process.env.API_URL}/farms`,
        {
          caf: agribusiness_data.caf,
          name: agribusiness_data.name,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      return { data: response.data, status: 201 };
    }
  ),

  searchOfferingFarms: defineServiceMethod<"searchOfferingFarms">(
    async (cycle_id, page, product) => {
      const response = await axios.get(`${process.env.API_URL}/offers`, {
        params: {
          cycle_id,
          page,
          product,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      return { data: response.data, status: 200 };
    }
  ),

  listFarmsWithOrders: defineServiceMethod<"listFarmsWithOrders">(
    async (access_token, cycle_id, page: number, name) => {
      const response = await axios.get(
        `${process.env.API_URL}/orders?cycle_id=${cycle_id}&page=${page}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      return { data: response.data, status: 200 };
    }
  ),

  listFarmOrders: defineServiceMethod<"listFarmOrders">(
    async (access_token, farm_id, cycle_id) => {
      const response = await axios.get(
        `${process.env.API_URL}/orders/${farm_id}?cycle_id=${cycle_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      return { data: response.data, status: 200 };
    }
  ),

  handleOrdersDelivery: defineServiceMethod<"handleOrdersDelivery">(
    async (access_token, body) => {
      try {
        const response = await axios.patch(
          `${process.env.API_URL}/orders`,
          body, // Ensure this is the correct payload
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        return { data: response.data, status: 204 };
      } catch (error) {
        throw error;
      }
    }
  ),
};
