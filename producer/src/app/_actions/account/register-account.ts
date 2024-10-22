"use server"

import ApiService from "@shared/service/index"

interface CreateUserRequest {
  firstName: string;
  lastName: string;
  cpf: string;
  email: string;
  phone: string;
  password: string;
  role: string
}

export async function registerAccount({ firstName, lastName, email, cpf, password, phone, role }: CreateUserRequest){
  const data = {
    first_name: firstName,
    last_name: lastName,
    cpf,
    email,
    phone,
    password,
    role
  }

  const response = ApiService.POST({
    url: '/users',
    data
  })

  return response;
}