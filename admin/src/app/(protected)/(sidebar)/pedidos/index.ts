"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { formatDateToDDMMYYYY } from "@shared/utils/date-handlers";
import { useHandleError } from "@shared/hooks/useHandleError";
import { BagDTO } from "@shared/interfaces/dtos";
import { listBags } from "@admin/_actions/bags/list-bags";

const useBagsPage = () => {
  const [isPending, startTransition] = useTransition();
  const [bags, setBags] = useState<BagDTO[]>([]);
  const [page, setPage] = useState(1);
  const [initialDate, setInitialDate] = useState<Date | undefined>(undefined);
  const [finalDate, setFinalDate] = useState<Date | undefined>(undefined);

  const router = useRouter();
  const { handleError } = useHandleError();

  const handleChangeInitialDate = (value: Date) => setInitialDate(value);
  const handleChangeFinalDate = (value: Date) => setFinalDate(value);

  useEffect(() => {
    startTransition(() => {
      getBags({ page, initialDate, finalDate });
    });
  }, [page, initialDate, finalDate]);

  const getBags = ({
    page,
    initialDate,
    finalDate,
  }: {
    page: number;
    initialDate?: Date;
    finalDate?: Date;
  }) => {
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
  };

  const nextPage = () => {
    if (bags.length < 20) {
      return;
    }
    setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const navigateToBagDetails = (id: string) => {
    router.push(`/pedidos/${id}`);
  };

  return {
    page,
    bags,
    initialDate,
    finalDate,
    nextPage,
    prevPage,
    isPending,
    handleChangeInitialDate,
    handleChangeFinalDate,
    navigateToBagDetails,
  };
};

export default useBagsPage;
