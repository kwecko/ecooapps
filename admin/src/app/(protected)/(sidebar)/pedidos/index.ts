"use client";

import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

import { formatDateToDDMMYYYY } from "@shared/utils/date-handlers";
import { useHandleError } from "@shared/hooks/useHandleError";
import { BagDTO } from "@shared/interfaces/dtos";
import { listBags } from "@admin/_actions/bags/list-bags";

export default function useBagsPage() {
  const [isPending, startTransition] = useTransition();
  const [bags, setBags] = useState<BagDTO[]>([]);
  const [page, setPage] = useState(1);
  const [initialDate, setInitialDate] = useState<Date | undefined>(undefined);
  const [finalDate, setFinalDate] = useState<Date | undefined>(undefined);

  const { handleError } = useHandleError();

  const handleChangeInitialDate = (value: Date) => setInitialDate(value);
  const handleChangeFinalDate = (value: Date) => setFinalDate(value);

  useEffect(() => {
    startTransition(() => {
      getBags({ page, initialDate, finalDate });
    });
  }, [page, initialDate, finalDate]);

  function getBags({
    page,
    initialDate,
    finalDate,
  }: {
    page: number;
    initialDate?: Date;
    finalDate?: Date;
  }) {
    const date_from = formatDateToDDMMYYYY(initialDate);
    const date_to = formatDateToDDMMYYYY(finalDate);

    listBags({ page, date_from, date_to })
      .then((response) => {
        if (response.message) return handleError(response.message);
        setBags(response.data);
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
    getBags({ page: 1 });
  }

  return {
    page,
    bags,
    initialDate,
    finalDate,
    nextPage,
    prevPage,
    isPending,
    reloadBags,
    handleChangeInitialDate,
    handleChangeFinalDate,
  };
}
