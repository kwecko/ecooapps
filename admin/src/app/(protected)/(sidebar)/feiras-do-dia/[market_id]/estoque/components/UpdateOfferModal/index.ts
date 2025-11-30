"use client";

import { useState, useTransition, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { updateOffer } from "@admin/_actions/offers/PATCH/update-offer";
import { updateOfferSchema, UpdateOfferSchema } from "@admin/schemas/offers";
import { useHandleError } from "@shared/hooks/useHandleError";
import { addTaxToPrice, removeTaxFromPrice } from "@shared/utils/convert-tax";
import { convertOfferAmount } from "@shared/utils/convert-unit";
import { OfferDTO } from "@shared/interfaces/dtos";

interface UseUpdateOfferModalProps {
  offer: OfferDTO | null;
  closeModal: () => void;
  reloadOffers: () => void;
}

export default function useUpdateOfferModal({
  offer,
  closeModal,
  reloadOffers,
}: UseUpdateOfferModalProps) {
  const [isPending, startTransition] = useTransition();
  const { handleError } = useHandleError();
  const [price, setPrice] = useState(0);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<UpdateOfferSchema>({
    resolver: zodResolver(updateOfferSchema),
  });

  useEffect(() => {
    if (offer) {
      const convertedAmount = convertOfferAmount(
        offer.amount,
        offer.product?.pricing || "UNIT"
      );
      const priceWithoutTax = removeTaxFromPrice(offer.price, 0.2);

      setValue("amount", convertedAmount);
      setValue("price", priceWithoutTax);
      setValue("description", offer.description || "");
      setValue("comment", offer.comment || "");
      setPrice(priceWithoutTax);

      if (offer.expires_at) {
        const date = new Date(offer.expires_at);
        if (!isNaN(date.getTime())) {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");
          const dateString = `${year}-${month}-${day}`;
          setValue("expires_at", dateString);
        }
      }
    }
  }, [offer, setValue]);

  const onSubmit = (data: UpdateOfferSchema) => {
    if (!offer) {
      toast.error("Oferta não encontrada.");
      return;
    }

    startTransition(async () => {
      const updateData: {
        amount?: number;
        price?: number;
        description?: string;
        comment?: string;
        expires_at?: string;
      } = {};

      if (data.amount !== undefined) {
        const finalAmount =
          offer.product?.pricing === "UNIT"
            ? data.amount
            : data.amount * 1000;
        updateData.amount = finalAmount;
      }

      if (data.price !== undefined) {
        const priceWithTax = addTaxToPrice(data.price, 0.2);
        updateData.price = priceWithTax;
      }

      if (data.description !== undefined) {
        updateData.description = data.description.trim() || null;
      }

      if (data.comment !== undefined) {
        updateData.comment = data.comment.trim() || null;
      }

      if (data.expires_at) {
        const date = new Date(data.expires_at);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        updateData.expires_at = `${day}-${month}-${year}`;
      }

      updateOffer({
        offer_id: offer.id,
        data: updateData,
      })
        .then((response) => {
          if (response.message) {
            return handleError(response.message);
          }

          toast.success("Oferta atualizada com sucesso!");
          reset();
          setPrice(0);
          closeModal();
          reloadOffers();
        })
        .catch(() => {
          toast.error("Erro ao atualizar oferta.");
        });
    });
  };

  return {
    register,
    handleSubmit,
    setValue,
    errors,
    isPending,
    onSubmit,
    price,
    setPrice,
  };
}

