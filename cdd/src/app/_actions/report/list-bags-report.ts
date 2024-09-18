"use server"

import ApiService from "@shared/service/index"

export async function ListBagsReport(cycle_id: string) {
  const response = await ApiService.GET({
    url: `/bags/report/${cycle_id}`
  })

  return response
}