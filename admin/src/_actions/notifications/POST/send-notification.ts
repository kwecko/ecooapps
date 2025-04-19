"use server";

import ApiService from "@shared/service";

export interface SendNotificationRequest {
  title: string;
  message: string;
  role: "USER" | "PRODUCER";
}

export async function sendNotification({
  title,
  message,
  role,
}: SendNotificationRequest) {
  const response = ApiService.POST({
    url: "/notifications",
    data: {
      title,
      message,
      role,
    },
  });

  return response;
}
