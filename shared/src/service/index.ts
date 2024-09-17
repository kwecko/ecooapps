import axios, { AxiosInstance } from "axios";
import { cookies } from "next/headers";

interface RequestProps {
  url: string;
  data?: any;
  typeReturn?: any 
}

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor(){
    this.axiosInstance = axios.create({
      baseURL: `${process.env.API_URL}`,
      headers: { "Content-Type": "application/json" }
    })
    this.initializeInterceptor()
  }

  private initializeInterceptor(){
    this.axiosInstance.interceptors.request.use(
      async config => {
        const token = cookies().get("token")?.value as string;

        if(token){
          config.headers["Authorization"] = `Bearer ${token}`
        }

        return config
      },
      error => Promise.reject(error)
    )
  }

  public async POST({ url, data, typeReturn }: RequestProps) {
    try {
      const response = await this.axiosInstance.post(url, data)

      return {
        data: response.data
      }
    } catch(error) {
      if (axios.isAxiosError(error)) {
        const apiErrorMessage = error.response?.data?.message || 'Erro desconhecido';
  
        return {
          message: apiErrorMessage
        }
      } else {
        return {
          message: `Erro desconhecido ${error}`
        }
      }
    }
  }

  public async GET({ url }: RequestProps) {
    try {
      const response = await this.axiosInstance.get(url)

      return { 
        data: response.data
      }
    } catch(error) {
      if(axios.isAxiosError(error)){
        const apiErrorMessage = error.response?.data?.message || 'Erro desconhecido';

        return {
          message: apiErrorMessage
        }
      } else {
        return {
          message: `Erro desconhecido ${error}`
        }
      }
    }
  }

  public async PATCH({ url, data }: RequestProps) {
    try {
      const response = await this.axiosInstance.patch(url, data)

      return {
        data: response.data
      }
    } catch(error) {
      if(axios.isAxiosError(error)){
        const apiErrorMessage = error.response?.data?.message || 'Erro desconhecido';

        return {
          message: apiErrorMessage
        }
      } else {
        return {
          message: `Erro desconhecido ${error}`
        }
      }
    }
  }

  public async DELETE({ url }: RequestProps) {
    try {
      const response = await this.axiosInstance.delete(url)

      return {
        data: response.data
      }
    } catch(error) {
      if(axios.isAxiosError(error)){
        const apiErrorMessage = error.response?.data?.message || 'Erro desconhecido';

        return {
          message: apiErrorMessage
        }
      } else {
        return {
          message: `Erro desconhecido ${error}`
        }
      }
    }
  }

  public async PUT({ url, data }: RequestProps) {
    try {
      const response = await this.axiosInstance.put(url, data)

      return {
        data: response.data
      }
    } catch(error) {
      if(axios.isAxiosError(error)){
        const apiErrorMessage = error.response?.data?.message || 'Erro desconhecido';

        return {
          message: apiErrorMessage
        }
      } else {
        return {
          message: `Erro desconhecido ${error}`
        }
      }
    }
  }
}

export default new ApiService()