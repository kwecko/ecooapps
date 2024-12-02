"use server";

import ApiService from "@shared/service";

interface RegisterRequest {
  first_name: string;
  last_name: string;
  cpf: string;
  email: string;
  phone: string;
  password: string;
  role: string;
}

export async function register({
  first_name,
  last_name,
  cpf,
  email,
  phone,
  password,
  role,
}: RegisterRequest) {
  const data = {
    first_name,
    last_name,
    cpf,
    email,
    phone,
    password,
    role,
  };

  const response = ApiService.POST({
    url: "/users",
    data,
  });

  return response;
}
