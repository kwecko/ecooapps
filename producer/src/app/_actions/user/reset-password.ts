"use server";

import ApiService from "@shared/service/index";

interface IResetPasswordProps {
  email: string;
}

export async function resetPassword({ email }: IResetPasswordProps) {
  const response = ApiService.POST({
    url: `/users/password`,
    data: {
      email: email,
    },
  });

  return response;
}
