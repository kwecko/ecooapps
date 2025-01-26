"use client";

import { useEffect, useState, useTransition } from "react";
import { notFound, useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import { getBagById } from "@admin/_actions/bags/get-bag-by-id";
import { useHandleError } from "@shared/hooks/useHandleError";

import { BagDTO } from "@shared/interfaces/dtos";

const useBagDetailsPage = () => {
  const [isPending, startTransition] = useTransition();
  const [bagDetails, setBagDetails] = useState<BagDTO>();
  const [paymentsPage, setPaymentsPage] = useState(1);

  const { bag_id } = useParams();
  const router = useRouter();
  const { handleError } = useHandleError();

  if (!bag_id) {
    notFound();
  }

  useEffect(() => {
    startTransition(() => {
      getBagDetails({ bagId: bag_id.toString(), paymentsPage });
    });
  }, [paymentsPage]);

  const getBagDetails = ({
    bagId,
    paymentsPage,
  }: {
    bagId: string;
    paymentsPage: number;
  }) => {
    getBagById({ bagId, paymentsPage })
      .then((response) => {
        if (response.message) return handleError(response.message);
        setBagDetails(response.data);
      })
      .catch(() => {
        toast.error("Erro desconhecido.");
      });
  };

  const nextPaymentsPage = () => {
    if (bagDetails && bagDetails.payments.length < 20) {
      return;
    }
    setPaymentsPage((prev) => prev + 1);
  };

  const prevPaymentsPage = () => {
    if (paymentsPage > 1) {
      setPaymentsPage((prev) => prev - 1);
    }
  };

  const navigateToBagsList = () => {
    router.push(`/pedidos`);
  };

  return {
    bagDetails,
    isPending,
    paymentsPage,
    nextPaymentsPage,
    prevPaymentsPage,
    navigateToBagsList,
  };
};

export default useBagDetailsPage;
