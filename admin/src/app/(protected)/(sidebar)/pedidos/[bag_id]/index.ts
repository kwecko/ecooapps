"use client";

import { useEffect, useState, useTransition } from "react";
import { notFound, useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import { getBagById } from "@admin/_actions/bags/get-bag-by-id";
import { updatePaymentById } from "@admin/_actions/payment/update-payment-by-id";
import { createPayment } from "@admin/_actions/payment/create-bag-payment";

import { useHandleError } from "@shared/hooks/useHandleError";

import { BagDTO } from "@shared/interfaces/dtos";
import { PaymentDTO, CreatePaymentDTO } from "@shared/interfaces/dtos/payment-dto";

const useBagDetailsPage = () => {
  const [isPending, startTransition] = useTransition();
  const [bagDetails, setBagDetails] = useState<BagDTO>();
  const [paymentsPage, setPaymentsPage] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState<PaymentDTO | null>();
  const [createPaymentModalIsOpen, setCreatePaymentModalIsOpen] = useState(false);
  const [paymentModalIsOpen, setPaymentModalIsOpen] = useState(false);
  const [loadingCreatePayment, setLoadingCreatePayment] = useState(false);
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
  }, [paymentsPage, loadingCreatePayment]);

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

  const startNewPayment = () => {
    setCreatePaymentModalIsOpen(true);
  }

  const closePaymentModal = () => {
    setPaymentModalIsOpen(false);
    setCreatePaymentModalIsOpen(false);
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

  const createNewPayment = (value: CreatePaymentDTO) => {

    setLoadingCreatePayment(true);
    createPayment({
      data: {
        bag_id: value.bag_id,
        method: value.method,
        flag: value.flag,
      }
    }).then((response) => {
      if (response.message) return handleError(response.message);
      closePaymentModal();
      toast.success("Pagamento criado com sucesso.");
    })
    .catch(() => {
      toast.error("Erro desconhecido.");
    })
    .finally(() => {
      setLoadingCreatePayment(false);
    });
  };

  const updateSelectedPayment = async () => {
    if (!selectedPayment) return;

    setLoadingUpdatePayment(true);
    updatePaymentById({
      paymentId: selectedPayment.id,
      data: {
        status: selectedPayment.status,
        method: selectedPayment.method,
        flag: selectedPayment.flag,
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
    createPaymentModalIsOpen,
    paymentModalIsOpen,
    selectedPayment,
    loadingCreatePayment,
    loadingUpdatePayment,
    nextPaymentsPage,
    prevPaymentsPage,
    navigateToBagsList,
    selectBagPayment,
    createNewPayment,
    closePaymentModal,
    editSelectedPayment,
    startNewPayment,
    updateSelectedPayment,
  };
};

export default useBagDetailsPage;
