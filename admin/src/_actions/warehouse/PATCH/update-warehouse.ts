"use server";

import ApiService from "@shared/service";

interface updateWarehouseRequest {
  name: string,
  CNPJ: string,
  manager: string,
  email: string,
  phone?: string,
  // socials?: [
  //   {
  //     platform?: string,
  //     value?: string
  //   }
  // ],
  address: {
    CEP: string,
    street: string,
    number: string,
    neighborhood: string,
    complement?: string,
    city: string,
    state: string,
    link?: string
  },
  coverage: [string]
}

export async function updateWarehouse( data: updateWarehouseRequest ) {

  const url = `/warehouse`;

  const response = ApiService.PATCH({
    url,
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
}
