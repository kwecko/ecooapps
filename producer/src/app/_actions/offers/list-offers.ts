"use server"

import ApiService from "@shared/service/index";

interface ListOffersRequest {
    cycle_id: string,
}

export async function listOffers({ cycle_id }: ListOffersRequest) {
    const response = ApiService.GET({
        url: `/offers/${cycle_id}`,
    })

    return response;
}