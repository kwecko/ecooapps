"use server";

import { IUserUpdate } from "@shared/interfaces/user";
import ApiService from "@shared/service/index";

export async function updateUser(data: IUserUpdate) {
  const response = ApiService.PATCH({
    url: "/users",
    data,
  });

  return response;
}
