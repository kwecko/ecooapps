"use server"

import ApiService from "../../service/index"
import { IUserUpdate } from "../../interfaces/update.user";

export async function updateUser(data: IUserUpdate) {
    const response = ApiService.PATCH({
    url: '/users',
    data
  })

  return response;
}