"use client";

import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { useParams } from "next/navigation";

import { listBags } from "@admin/_actions/bags/GET/list-bags";
import { useHandleError } from "@shared/hooks/useHandleError";
import { BagDTO } from "@shared/interfaces/dtos";

export default function useVendasPage() {
  const params = useParams();
  const market_id = params?.market_id as string;
  const [page, setPage] = useState(1);
  const [isPending, startTransition] = useTransition();
  const [bags, setBags] = useState<BagDTO[]>([]);
  const { handleError } = useHandleError();

  useEffect(() => {
    startTransition(() => {
      getBags({ page, market_id });
    });
  }, [page, market_id]);

  function getBags({
    page,
    market_id,
  }: {
    page: number;
    market_id: string;
  }) {
    listBags({ page, market_id })
      .then((response) => {
        if (response.message) return handleError(response.message);
        setBags(response.data || []);
      })
      .catch(() => {
        toast.error("Erro desconhecido.");
      });
  }

  function nextPage() {
    if (bags.length < 20) {
      return;
    }
    setPage((prev) => prev + 1);
  }

  function prevPage() {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  }

  function reloadBags() {
    getBags({ page: 1, market_id });
    setPage(1);
  }

  return {
    market_id,
    page,
    bags,
    nextPage,
    prevPage,
    isPending,
    reloadBags,
  };
}

