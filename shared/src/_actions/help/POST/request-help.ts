"use server";

import ApiService from "@shared/service";

export interface RequestHelpRequest {
  message: string;
}

export async function requestHelp({
   message,
}: RequestHelpRequest) {
  const response = ApiService.POST({
    url: "/help",
    data: {
      message: message
    },
  });

  return response;
}
