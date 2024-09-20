"use server"

import ApiService from "@shared/service/index"

export async function updateUser(data: {first_name: string, last_name: string, phone: string, password: string, email: string, cpf: string}) {
    const response = ApiService.PATCH({
    url: '/users',
    data
  })

  return response;
}