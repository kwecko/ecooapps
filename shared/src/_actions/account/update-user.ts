"use server";

import ApiService from "@shared/service/index";
import { IUser } from "@shared/interfaces/user";

export async function updateUser(data: IUser) {
  const response = ApiService.PATCH({
    url: "/users",
    data,
  });

  return response;
}
