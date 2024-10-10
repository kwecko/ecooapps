"use server";

import ApiService from "../../service/index";
import { User as IUser } from "../../interfaces/user";

export async function updateUser(data: IUser) {
  const response = ApiService.PATCH({
    url: "/users",
    data,
  });

  return response;
}
