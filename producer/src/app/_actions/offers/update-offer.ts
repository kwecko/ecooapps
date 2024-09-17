"use server"

import ApiService from "@shared/service/index";

interface UpdateOfferRequest {
    offer_id: string,
    amount: number,
    price: number,
}

export async function UpdateOffer({ offer_id, amount, price }: UpdateOfferRequest) {
    const response = ApiService.PATCH({
        url: `/offers/${offer_id}`,
        data: {
            amount,
            price
        }
    })
    return response;
}