"use server"

import ApiService from "@shared/service/index";

interface FetchLastCatalogRequest {
    cycle_id: string,
}

export async function fetchLastCatalog({ cycle_id }: FetchLastCatalogRequest) {
    const response = ApiService.GET({
        url: `/catalogs/current/${cycle_id}`,
    })

    return response;
}

