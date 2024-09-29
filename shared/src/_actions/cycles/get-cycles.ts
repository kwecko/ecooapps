"use server"

import ApiService from "@shared/service/index"

export async function getCycles(){
  const response = ApiService.GET({
    url: '/cycles'
  })

  return response
}