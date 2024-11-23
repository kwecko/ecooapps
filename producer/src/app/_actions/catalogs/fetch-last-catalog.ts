"use server"

import ApiService from "@shared/service/index";

interface FetchLastCatalogRequest {
    cycle_id: string,
    page: number,
}

export async function fetchLastCatalog({ cycle_id, page = 1 }: FetchLastCatalogRequest) {
    const response = ApiService.GET({
        url: `/catalogs/last?cycle_id=${cycle_id}&page=${page}`
    })

    return response;
}

