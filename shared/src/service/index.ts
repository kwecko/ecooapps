import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";
import { SetTokenCookie } from "../utils/set-token-cookie";
import { tokenKeys } from "../data/token-keys";
import { AppID } from "../library/types/app-id";

interface RequestProps {
  url: string;
  data?: any;
  responseType?: AxiosRequestConfig['responseType'];
  headers?: Record<string, string>;
}

class ApiService {
  private axiosInstance: AxiosInstance;
  private tokenKey: string;

  constructor() {
    this.tokenKey = process.env.APP_ID as AppID;

    this.axiosInstance = axios.create({
      baseURL: `${process.env.API_URL}`,
      headers: { "Content-Type": "application/json" },
    });
    this.initializeInterceptor();
    this.initializeResponseInterceptor();
  }

  private initializeInterceptor() {
    this.axiosInstance.interceptors.request.use(
      async (config) => {
        const token =
          cookies().get(tokenKeys[this.tokenKey as AppID])?.value ||
          cookies().get("token-reset-password")?.value;

        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  private initializeResponseInterceptor() {
    this.axiosInstance.interceptors.response.use(
      (response) => {
        const setCookieHeader = response.headers["set-cookie"];

        if (setCookieHeader) {
          const tokenCookie = setCookieHeader.find((cookie: string) =>
            cookie.startsWith("token=")
          );

          if (tokenCookie) {
            SetTokenCookie({
              token: tokenCookie.split("=")[1],
              appID: this.tokenKey as AppID
            })
          }
        }

        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  private async request({ url, data, responseType, headers, method }: RequestProps & { method: string }) {
    try {
      const config: AxiosRequestConfig = {
        url,
        method,
        data,
        headers,
        responseType,
      };

      const response = await this.axiosInstance.request(config);

      return {
        data: response.data,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const apiErrorMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          JSON.stringify(error.response?.data) ||
          "Erro desconhecido";

        return {
          message: apiErrorMessage,
        };
      } else {
        return {
          message: `Erro desconhecido ${error}`,
        };
      }
    }
  }

  public async POST({ url, data, headers }: RequestProps) {
    return this.request({ url, data, headers, method: "post" });
  }

  public async GET({ url, responseType, headers }: RequestProps) {
    return this.request({ url, responseType, headers, method: "get" });
  }

  public async PATCH({ url, data, headers }: RequestProps) {
    return this.request({ url, data, headers, method: "patch" });
  }

  public async DELETE({ url, headers }: RequestProps) {
    return this.request({ url, headers, method: "delete" });
  }

  public async PUT({ url, data, headers }: RequestProps) {
    return this.request({ url, data, headers, method: "put" });
  }
}

export default new ApiService();