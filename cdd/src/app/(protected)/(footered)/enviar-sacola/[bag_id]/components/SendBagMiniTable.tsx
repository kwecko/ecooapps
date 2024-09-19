'use client'

import { toast } from "sonner";
import { useEffect, useState } from "react";
import { notFound, useParams, useRouter } from "next/navigation";
import { fetchBag } from "@cdd/app/_actions/bag/fetch-bag";
import { handleBag } from "@cdd/app/_actions/bag/handle-bag";

import Modal from "@shared/components/Modal";
import { BagOrder } from "@shared/interfaces/bag-order"
import TableSkeleton from "@shared/components/TableSkeleton";
import { useHandleError } from "@shared/hooks/useHandleError";
import { getNextSaturdayDate } from "@shared/utils/get-next-saturday-date";
import { convertUnit } from "@shared/utils/convert-unit";

export default function SendBagMiniTable() {
  const router = useRouter()

  const [bagOrder, setBagOrder] = useState<BagOrder | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { handleError } = useHandleError()

  const { bag_id } = useParams();

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

  const handleStatusBag = async (bag_id: string, status: "SEPARATED") => {
    handleBag({
      bag_id,
      status: "DISPATCHED"
    })
      .then((response) => {
        if (response.message) {
          const messageError = response.message as string

          handleError(messageError)
        } else {
          sessionStorage.setItem(
            "data-sucess",
            JSON.stringify({
              title: "A oferta foi Reprovada!",
              description: "A sacola do cliente foi enviada.",
              button: {
                secundary: "/",
                primary: "/enviar-sacola",
              },
            })
          );
          router.push(`/success`);
          return;
        }
      })
      .catch(() => {
        toast.error("Erro desconhecido.")
      })
  }

  return (
    <>
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <div className="w-full h-full flex flex-col justify-between">
          <div className="max-w-sm mx-auto bg-white rounded-lg">
            <div className="flex gap-10 items-start text-theme-primary border-b-[1px] border-theme-background p-3">
              <span className="w-1/5">Pedido:</span>
              <span className="w-4/5">{bagOrder?.id}</span>
            </div>
            <div className="flex gap-10 items-start text-theme-primary border-b-[1px] border-theme-background p-3">
              <span className="w-1/5">Status:</span>
              <span className="w-4/5">{bagOrder?.status === "PENDING" ? "Pendente" : "Pronta"}</span>
            </div>
            <div className="flex gap-10 items-start text-theme-primary border-b-[1px] border-theme-background p-3">
              <span className="w-1/5">Cliente:</span>
              <span className="w-4/5">{`${bagOrder?.user.first_name} ${bagOrder?.user.last_name}`}</span>
            </div>
            <div className="flex gap-10 items-start text-theme-primary border-b-[1px] border-theme-background p-3">
              <span className="w-1/5">Prazo:</span>
              <span className="w-4/5">{getNextSaturdayDate()}</span>
            </div>
            <div className="text-theme-primary p-3">Conteúdo:</div>
            <div className="pl-3 pb-3 text-theme-primary">
              {bagOrder?.orders.map(order => (
                <div key={order.id}>
                  {`${order.amount}${convertUnit(order.offer.product.pricing)} - ${order.offer.product.name}`}
                </div>
              ))}
            </div>
          </div>
          <div className="w-full h-[10%] flex justify-center items-end">
            {bagOrder?.status === "SEPARATED" ? (
              <Modal
                titleOpenModal="Marcar como enviada"
                titleContentModal="Você tem certeza?"
                contentModal="Ao alterar o status para enviada, o cliente será notificado que ela está a caminho."
                bgOpenModal="#00735E"
                titleCloseModal="Cancelar"
                titleConfirmModal="Confirmar"
                bgConfirmModal="#00735E"
                bgCloseModal="#EEF1F4"
                modalAction={() => {
                  handleStatusBag(bagOrder.id, "SEPARATED")
                }}
              />
            ) : (
              <>
                <span className="text-center mt-6 text-slate-gray">Sacola já enviada!</span>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
