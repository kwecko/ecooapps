"use server"

import ApiService from "@shared/service/index";

interface DeleteOfferRequest {
    offer_id: string
}

export async function deleteOffer({ offer_id }: DeleteOfferRequest) {
    const response = ApiService.DELETE({
        url: `/offers/${offer_id}`
    })
    return response;
}