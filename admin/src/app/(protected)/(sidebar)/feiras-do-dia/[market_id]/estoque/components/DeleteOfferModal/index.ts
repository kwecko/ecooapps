"use client";

import { toast } from "sonner";
import { useTransition } from "react";

import { useHandleError } from "@shared/hooks/useHandleError";
import { deleteOffer } from "@admin/_actions/offers/DELETE/delete-offer";

interface UseDeleteOfferModalProps {
  closeModal: () => void;
  reloadOffers: () => void;
}

export default function useDeleteOfferModal({
  closeModal,
  reloadOffers,
}: UseDeleteOfferModalProps) {
  const [isPending, startTransition] = useTransition();
  const { handleError } = useHandleError();

  const handleDelete = (offerId: string, setIsOpenDisableModal?: React.Dispatch<React.SetStateAction<boolean>>) => {
    startTransition(async () => {
      if (!offerId) return;

      deleteOffer({ offer_id: offerId })
        .then((response) => {

          if (response.message === "A oferta já possui pedidos associados e não pode ser alterada ou removida.") {
            setIsOpenDisableModal?.(true);
          }

          if (response.message) return handleError(response.message);

          toast.success("Oferta deletada com sucesso!");
          closeModal();
          reloadOffers();
        })
        .catch(() => {
          toast.error("Erro ao deletar oferta.");
        });
    });
  };

  return {
    isPending,
    handleDelete,
  };
}

