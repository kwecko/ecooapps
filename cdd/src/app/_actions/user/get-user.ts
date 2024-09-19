"use server"

import ApiService from "@shared/service/index"

export async function getUser() {
  const response = ApiService.GET({
    url: '/me'
  })

  return response;
}