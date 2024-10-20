'use client'

import { toast } from "sonner";
import { useEffect, useState } from "react";
import { notFound, useParams, useRouter } from "next/navigation";
import { fetchBag } from "@cdd/app/_actions/bag/fetch-bag";
import { handleBag } from "@cdd/app/_actions/bag/handle-bag";

import GroupOrder from "@shared/components/GroupOrder";
import Modal from "@shared/components/Modal";
import { BagOrder } from "@shared/interfaces/bag-order";
import TableSkeleton from "@shared/components/TableSkeleton";
import { useHandleError } from "@shared/hooks/useHandleError";
import { getNextSaturdayDate } from "@shared/utils/get-next-saturday-date"
import { convertUnit } from "@shared/utils/convert-unit";

export default function BagMiniTable() {
  const router = useRouter()
  const { bag_id } = useParams();

  const [bagOrder, setBagOrder] = useState<BagOrder>();
  const [isLoading, setIsLoading] = useState(true);

  const { handleError } = useHandleError()

  if (!bag_id) {
    notFound()
  }

  useEffect(() => {
    (() => {
      setIsLoading(true)
      fetchBag({
        bag_id: bag_id as string
      })
        .then((response) => {
          if (response.message) {
            const messageError = response.message as string

            handleError(messageError)
          } else if (response.data) {
            setBagOrder(response.data)
            setIsLoading(false)
            return;
          }
        })
        .catch(() => {
          toast.error("Erro desconhecido.")
        })
    })()
  }, [bag_id]);

  const handleStatusBag = (bag_id: string, status: "PENDING" | "SEPARATED") => {
    if (status === 'PENDING') {
      handleBag({
        bag_id,
        status: "SEPARATED"
      })
        .then((response) => {
          if (response.message) {
            const messageError = response.message as string

            handleError(messageError)
          } else {
            sessionStorage.setItem(
              "data-sucess",
              JSON.stringify({
                title: "A sacola está pronta!",
                description: "A sacola do cliente está pronta.",
                button: {
                  secondary: {
                    router: "/",
                    name: "Voltar para a tela inicial",
                  },
                  primary: {
                    router: "/montar-sacola",
                    name: "Enviar sacola agora"
                  },
                },
              })
            );

            router.push("/sucesso");
            return;
          }
        })
        .catch(() => {
          toast.error("Erro desconhecido.")
        })
    } else if (status === "SEPARATED") {
      handleBag({
        bag_id,
        status: "PENDING"
      })
        .then((response) => {
          if (response.message) {
            const messageError = response.message as string

            handleError(messageError)
          } else {
            sessionStorage.setItem(
              "data-sucess",
              JSON.stringify({
                title: "A sacola foi alterada!",
                description: "A sacola do cliente está pendente para ser montada",
                button: {
                  secondary: {
                    router: "/",
                    name: "Voltar para a tela inicial",
                  },
                  primary: {
                    router: "/montar-sacola",
                    name: "Enviar sacola agora"
                  },
                }
              })
            );

            router.push("/sucesso");
            return;
          }
        })
        .catch(() => {
          toast.error("Erro desconhecido.")
        })
    }
  }

  const groupProducts = (orders: any[]) => {
    const grouped: { [key: string]: { amount: number; unit: string; farmName: string } } = {};

    orders.forEach((order) => {
      const productName = order.offer.product.name;
      const productKey = `${productName}-${order.offer.catalog.farm.name}`; // Unique key per product and farm

      if (grouped[productKey]) {
        grouped[productKey].amount += order.amount;
      } else {
        grouped[productKey] = {
          amount: order.amount,
          unit: convertUnit(order.offer.product.pricing),
          farmName: order.offer.catalog.farm.name,
        };
      }
    });

    return grouped;
  };

  return (
    <>
      {isLoading ? (
        <TableSkeleton />
      ) : bagOrder ? (
        <div className="w-full h-full flex flex-col justify-between">
          <div className="max-w-sm mx-auto bg-white rounded-lg">
            <div className="flex gap-10 items-start text-theme-primary border-b border-theme-background p-3">
              <span className="w-1/5">Pedido:</span>
              <span className="w-4/5">{bagOrder?.id}</span>
            </div>
            <div className="flex gap-10 items-start text-theme-primary border-b border-theme-background p-3">
              <span className="w-1/5">Status:</span>
              <span className="w-4/5">{bagOrder?.status === "PENDING" ? "Pendente" : "Pronta"}</span>
            </div>
            <div className="flex gap-10 items-start text-theme-primary border-b border-theme-background p-3">
              <span className="w-1/5">Cliente:</span>
              <span className="w-4/5">{`${bagOrder?.user.first_name} ${bagOrder?.user.last_name}`}</span>
            </div>
            <div className="flex gap-10 items-start text-theme-primary border-b border-theme-background p-3">
              <span className="w-1/5">Prazo:</span>
              <span className="w-4/5">{getNextSaturdayDate()}</span>
            </div>
            {bagOrder && (
              <GroupOrder 
                orders={bagOrder.orders} 
              />
            )}
          </div>
          <div className="w-full h-[10%] flex justify-center items-end">
            {bagOrder?.status === "PENDING" ? (
              <Modal
                titleContentModal="Você tem certeza?"
                contentModal="Ao marcar a sacola como pronta, o cliente será notificado."
                titleCloseModal="Cancelar"
                titleConfirmModal="Confirmar"
                titleOpenModal="Marcar como pronta"
                bgOpenModal="#00735E"
                bgConfirmModal="#00735E"
                bgCloseModal="#EEF1F4"
                modalAction={() => {
                  handleStatusBag(bag_id as string, "PENDING")
                }}
              />
            ) : (
              <Modal
                titleContentModal="Você tem certeza?"
                contentModal="Ao alterar o status para pendente, a sacola deverá ser montada novamente."
                titleCloseModal="Cancelar"
                titleConfirmModal="Alterar"
                titleOpenModal="Alterar para pendente"
                bgOpenModal="#FF7070"
                bgConfirmModal="#FF7070"
                bgCloseModal="#EEF1F4"
                modalAction={() => {
                  handleStatusBag(bag_id as string, "SEPARATED")
                }}
              />
            )}
          </div>
        </div>
      ) : (
        <span className="text-center text-red-500">Erro ao carregar os dados da sacola</span>
      )}
    </>
  );
}

