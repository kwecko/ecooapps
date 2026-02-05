"use client";

import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { useParams } from "next/navigation";

import { listOffers } from "@admin/_actions/offers/GET/list-offers";
import { useHandleError } from "@shared/hooks/useHandleError";
import { useDebounce } from "@shared/hooks/useDebounce";
import { OfferDTO } from "@shared/interfaces/dtos";

export default function useVenderPage() {
  const params = useParams();
  const market_id = params?.market_id as string;
  const [search, setSearch] = useState("");
  const [isPending, startTransition] = useTransition();
  const [offers, setOffers] = useState<OfferDTO[]>([]);
  const { handleError } = useHandleError();

  const debounceSearch = useDebounce(search);

  useEffect(() => {
    startTransition(() => {
      getOffers({ market_id, available: 'MARKET', product: debounceSearch });
    });
  }, [market_id, debounceSearch]);

  function getOffers({
    market_id,
    available,
    product,
  }: {
    market_id: string;
    available?: 'MARKET' | 'CYCLE';
    product?: string;
  }) {
    listOffers({ page: 1, market_id, available, product })
      .then((response) => {
        if (response.message) return handleError(response.message);
        setOffers(response.data || []);
      })
      .catch(() => {
        toast.error("Erro desconhecido.");
      });
  }

  return {
    market_id,
    search,
    setSearch,
    offers,
    isPending,
  };
}
