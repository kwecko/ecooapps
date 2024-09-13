"use server"

import ApiService from "@shared/service/index";

interface FetchLastCatalogRequest {
    cycle_id: string,
}

export async function fetchLastCatalog({ cycle_id }: FetchLastCatalogRequest) {
    const response = ApiService.GET({
        url: `/catalogs/last/${cycle_id}`,
    })

    return response;
}

