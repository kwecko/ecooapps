'use client'

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useLocalStorage } from "@shared/hooks/useLocalStorage"
import { fetchFarmOrders } from "@cdd/app/_actions/farm/fetch-farm-orders";
import { handleOrderDelivery } from "@cdd/app/_actions/order/handle-order-delivery";
import Modal from "@shared/components/Modal";
import dayjs from "dayjs";
import { notFound, useParams, useRouter } from "next/navigation";
import { FarmOrders } from "@shared/interfaces/farm-orders";
import TableSkeleton from "@shared/components/TableSkeleton";
import { useHandleError } from "@shared/hooks/useHandleError";

export default function FarmOrdersTable() {
  const router = useRouter();
  const { farm_id } = useParams();

  const [farmOrders, setFarmOrders] = useState<FarmOrders | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { handleError } = useHandleError()
  const { getFromStorage } = useLocalStorage()

  if (!farm_id) {
    notFound();
  }

  useEffect(() => {
    (async () => {
      const cycle = getFromStorage('selected-cycle');

      if (!cycle) {
        toast.error("Selecione um ciclo para receber ofertas!");
      }

      const { id } = cycle;

      await fetchFarmOrders({
        cycle_id: id,
        farm_id: farm_id as string
      })
        .then((response) => {
          if (response.message) {
            const messageError = response.message as string

            handleError(messageError)
          } else if (response.data) {
            setFarmOrders(response.data);
            setIsLoading(false);
            return;
          }
        })
        .catch((error) => {
          toast.error(error)
        })
    })();
  }, [farm_id]);

  const handleStatusOrder = async (status: "RECEIVED" | "CANCELLED") => {
    if (farmOrders?.orders.length === 0) {
      toast.error("Não é possível receber ofertas sem conteúdo!");
      return;
    }

    const cycle = getFromStorage('selected-cycle');
    const { id } = cycle;

    await handleOrderDelivery({
      cycle_id: id,
      farm_id: farm_id as string,
      status,
    })
      .then((response) => {
        if (response.message) {
          const messageError = response.message as string

          handleError(messageError)
        } else {
          if (status === "RECEIVED") {
            router.push(`/ofertas/${farm_id}/aprovar`);
          } else if (status === "CANCELLED") {
            router.push(`/ofertas/${farm_id}/rejeitar`);
          }
        }
      })
      .catch(() => {
        toast.error("Erro desconhecido.")
      })
  };

  const getNextSaturdayDate = () => {
    const today = dayjs();
    const dayOfWeek = today.day();
    const daysUntilSaturday = 6 - dayOfWeek;
    const nextSaturday = today.add(daysUntilSaturday, 'day');

    return nextSaturday.format("DD/MM/YYYY");
  };

  return (
    <>
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <div className="w-full h-full flex flex-col justify-between">
          <div className="w-full mx-auto bg-white rounded-lg">
            <div className="flex gap-10 items-start text-theme-primary border-b-[1px] border-theme-background p-3">
              <span className="w-1/5">Pedido:</span>
              <span className="w-4/5">{farmOrders?.id}</span>
            </div>
            <div className="flex gap-10 items-start text-theme-primary border-b-[1px] border-theme-background p-3">
              <span className="w-1/5">Produtor:</span>
              <span className="w-4/5">{farmOrders?.name}</span>
            </div>
            <div className="flex gap-10 items-start text-theme-primary border-b-[1px] border-theme-background p-3">
              <span className="w-1/5">Prazo:</span>
              <span className="w-4/5">{getNextSaturdayDate()}</span>
            </div>
            <div className="text-theme-primary p-3">Conteúdo:</div>
            <div className="pl-3 pb-3 text-theme-primary">
              {farmOrders?.orders.map(order => (
                <div key={order.id}>
                  {`${order.amount}${order.offer.product.pricing === 'WEIGHT' ? 'g' : 'un'} - ${order.offer.product.name}`}
                </div>
              ))}
            </div>
          </div>
          <div className="w-full h-[10%] flex gap-2 justify-center items-end">
            <Modal
              titleContentModal="Você tem certeza?"
              contentModal="Após rejeitar a entrega essa operação não poderá ser desfeita. Em caso de erro, entre em contato com o suporte."
              titleCloseModal="Cancelar"
              titleConfirmModal="Rejeitar"
              titleOpenModal="Rejeitar"
              bgOpenModal="#FF7070"
              bgConfirmModal="#FF7070"
              bgCloseModal="#EEF1F4"
              modalAction={() => handleStatusOrder("CANCELLED")}
            />

            <Modal
              titleContentModal="Você tem certeza?"
              contentModal="Após aprovar a oferta essa operação não poderá ser desfeita. Em caso de erro, entre em contato com o suporte."
              titleCloseModal="Cancelar"
              titleConfirmModal="Aprovar"
              titleOpenModal="Aprovar"
              bgOpenModal="#00735E"
              bgConfirmModal="#00735E"
              bgCloseModal="#EEF1F4"
              modalAction={() => handleStatusOrder("RECEIVED")}
            />
          </div>
        </div>
      )}
    </>
  );
}
