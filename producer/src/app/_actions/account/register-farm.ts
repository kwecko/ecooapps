"use server"

import ApiService from "@shared/service"

interface RegisterFarmRequest {
  name: string;
  caf: string;
}

export async function registerFarm({ name, caf }: RegisterFarmRequest){
  const response = ApiService.POST({
    url: '/farms',
    data: {
      name,
      caf
    }
  })

  return response;
}