"use client";

import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { useParams, useSearchParams, useRouter } from "next/navigation";

import { listOffers } from "@admin/_actions/offers/GET/list-offers";
import { useDebounce } from "@shared/hooks/useDebounce";
import { useHandleError } from "@shared/hooks/useHandleError";
import { OfferDTO } from "@shared/interfaces/dtos";

export default function useEstoquePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const market_id = params?.market_id as string;
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isPending, startTransition] = useTransition();
  const [offers, setOffers] = useState<OfferDTO[]>([]);
  const { handleError } = useHandleError();

  const debounceSearch = useDebounce(search);

  useEffect(() => {
    setPage(1);
  }, [debounceSearch]);

  useEffect(() => {
    startTransition(() => {
      getOffers({ page, market_id, product: debounceSearch });
    });
  }, [debounceSearch, page, market_id]);

  function getOffers({
    page,
    market_id,
    product,
  }: {
    page: number;
    market_id: string;
    product: string;
  }) {
    listOffers({ page, market_id, product })
      .then((response) => {
        if (response.message) return handleError(response.message);
        setOffers(response.data || []);
      })
      .catch(() => {
        toast.error("Erro desconhecido.");
      });
  }

  function nextPage() {
    if (offers.length < 20) {
      return;
    }
    setPage((prev) => prev + 1);
  }

  function prevPage() {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  }

  const [isOpenAddStockModal, setIsOpenAddStockModal] = useState(false);

  useEffect(() => {
    const openModal = searchParams.get("openModal");
    if (openModal === "true") {
      setIsOpenAddStockModal(true);
      router.replace(`/feiras-do-dia/${market_id}/estoque`);
    }
  }, [searchParams, market_id, router]);

  function handleAddStock() {
    setIsOpenAddStockModal(true);
  }

  function reloadOffers() {
    getOffers({ page: 1, market_id, product: "" });
    setPage(1);
    setSearch("");
  }

  return {
    market_id,
    search,
    setSearch,
    page,
    offers,
    nextPage,
    prevPage,
    isPending,
    handleAddStock,
    isOpenAddStockModal,
    setIsOpenAddStockModal,
    reloadOffers,
  };
}

