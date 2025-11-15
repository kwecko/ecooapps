"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

import { updateMarket } from "@admin/_actions/markets/PATCH/update-market";
import { useHandleError } from "@shared/hooks/useHandleError";
import { MarketDTO } from "@shared/interfaces/dtos";

interface UseEndMarketModalProps {
  closeModal: () => void;
  market: MarketDTO | null;
}

export default function useEndMarketModal({
  closeModal,
  market,
}: UseEndMarketModalProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { handleError } = useHandleError();

  const handleEndMarket = () => {
    if (!market?.id) return;

    startTransition(async () => {
      updateMarket({
        market_id: market.id,
        data: { open: false.toString() },
      })
        .then((response) => {
          if (response.message) {
            return handleError(response.message);
          }

          toast.success("Feira encerrada com sucesso!");
          closeModal();
          router.push("/feiras-do-dia");
        })
        .catch(() => {
          toast.error("Erro ao encerrar a feira.");
        });
    });
  };

  return {
    isPending,
    handleEndMarket,
  };
}

