"use client";

import { useEffect, useState, useTransition } from "react";
import { notFound, useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import { getBagById } from "@admin/_actions/bags/get-bag-by-id";
import { updateBagById } from "@admin/_actions/bags/update-bag-by-id";
import { useHandleError } from "@shared/hooks/useHandleError";

import { BagDTO, PaymentDTO } from "@shared/interfaces/dtos";

const useBagDetailsPage = () => {
  const [isPending, startTransition] = useTransition();
  const [bagDetails, setBagDetails] = useState<BagDTO>();
  const [paymentsPage, setPaymentsPage] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState<PaymentDTO | null>();
  const [paymentModalIsOpen, setPaymentModalIsOpen] = useState(false);
  const [loadingUpdatePayment, setLoadingUpdatePayment] = useState(false);

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

  const selectBagPayment = (payment: PaymentDTO) => {
    setSelectedPayment(payment);
    setPaymentModalIsOpen(true);
  };

  const closePaymentModal = () => {
    setPaymentModalIsOpen(false);
    setSelectedPayment(null);
  };

  const editSelectedPayment = (key: string, value: string) => {
    if (!selectedPayment) return;

    let updatedPayment = { ...selectedPayment, [key]: value };
    if (
      updatedPayment.method &&
      ["CREDIT", "DEBIT"].includes(updatedPayment.method) &&
      !updatedPayment.flag
    ) {
      updatedPayment = { ...updatedPayment, flag: "VISA" };
    }

    setSelectedPayment(updatedPayment);
  };

  const updateSelectedPayment = async () => {
    if (!selectedPayment) return;

    setLoadingUpdatePayment(true);
    updateBagById({
      bagId: bag_id.toString(),
      data: {
        payments: [
          {
            id: selectedPayment.id,
            status: selectedPayment.status,
            method: selectedPayment.method,
            flag: selectedPayment.flag,
          },
        ],
      },
    })
      .then((response) => {
        if (response.message) return handleError(response.message);
        setBagDetails((prev) =>
          prev
            ? {
                ...prev,
                payments: prev.payments.map((payment) =>
                  payment.id === selectedPayment.id
                    ? {
                        ...payment,
                        status: selectedPayment.status,
                        method: selectedPayment.method,
                        flag: selectedPayment.flag,
                      }
                    : payment
                ),
              }
            : prev
        );
        closePaymentModal();
        toast.success("Pagamento atualizado com sucesso.");
      })
      .catch(() => {
        toast.error("Erro desconhecido.");
      })
      .finally(() => {
        setLoadingUpdatePayment(false);
      });
  };

  return {
    bagDetails,
    isPending,
    paymentsPage,
    paymentModalIsOpen,
    selectedPayment,
    loadingUpdatePayment,
    nextPaymentsPage,
    prevPaymentsPage,
    navigateToBagsList,
    selectBagPayment,
    closePaymentModal,
    editSelectedPayment,
    updateSelectedPayment,
  };
};

export default useBagDetailsPage;
