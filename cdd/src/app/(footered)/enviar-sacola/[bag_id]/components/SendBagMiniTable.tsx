"use client";

import Modal from "@shared/components/Modal";
import TableSkeleton from "@shared/components/TableSkeleton";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Dados simulados da primeira página
const fakeBags = [
  {
    id: "12345",
    status: "SEPARATED",
    user: { first_name: "João", last_name: "Silva" },
    orders: [
      {
        id: "1",
        offer: {
          amount: 500,
          product: {
            name: "Arroz",
            pricing: "WEIGHT",
          },
        },
      },
      {
        id: "2",
        offer: {
          amount: 1,
          product: {
            name: "Cebola roxa",
            pricing: "UNIT",
          },
        },
      },
    ],
  },
  {
    id: "12346",
    status: "DISPATCHED",
    user: { first_name: "Maria", last_name: "Oliveira" },
    orders: [
      {
        id: "1",
        offer: {
          amount: 1000,
          product: {
            name: "Feijão",
            pricing: "WEIGHT",
          },
        },
      },
      {
        id: "2",
        offer: {
          amount: 2,
          product: {
            name: "Batata",
            pricing: "UNIT",
          },
        },
      },
    ],
  },
  {
    id: "12347",
    status: "SEPARATED",
    user: { first_name: "Carlos", last_name: "Pereira" },
    orders: [
      {
        id: "1",
        offer: {
          amount: 750,
          product: {
            name: "Farinha",
            pricing: "WEIGHT",
          },
        },
      },
      {
        id: "2",
        offer: {
          amount: 3,
          product: {
            name: "Alho",
            pricing: "UNIT",
          },
        },
      },
    ],
  },
  {
    id: "12348",
    status: "DISPATCHED",
    user: { first_name: "Ana", last_name: "Souza" },
    orders: [
      {
        id: "1",
        offer: {
          amount: 600,
          product: {
            name: "Açúcar",
            pricing: "WEIGHT",
          },
        },
      },
      {
        id: "2",
        offer: {
          amount: 4,
          product: {
            name: "Cenoura",
            pricing: "UNIT",
          },
        },
      },
    ],
  },
];

export default function SendBagMiniTable() {
  const router = useRouter()

  const { bag_id } = useParams();
  const [bagOrder, setBagOrder] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    // Encontrando o pedido correto baseado no ID
    const selectedBag = fakeBags.find((bag) => bag.id === bag_id);
    
    if (selectedBag) {
      setBagOrder(selectedBag);
    }

    setIsLoading(false);
  }, [bag_id]);

  const getNextSaturdayDate = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysUntilSaturday = 6 - dayOfWeek;
    const nextSaturday = new Date(today);
    nextSaturday.setDate(today.getDate() + daysUntilSaturday);

    return nextSaturday.toLocaleDateString("pt-BR");
  };

  return (
    <>
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <div className="w-full h-full flex flex-col justify-between">
          <div className="w-full mx-auto bg-white rounded-lg">
            <div className="flex w-full gap-10 items-start text-theme-primary border-b-[1px] border-theme-background p-3">
              <span className="w-1/5">Pedido:</span>
              <span className="w-4/5">{bagOrder?.id}</span>
            </div>
            <div className="flex w-full gap-10 items-start text-theme-primary border-b-[1px] border-theme-background p-3">
              <span className="w-1/5">Status:</span>
              <span className="w-4/5">{bagOrder?.status === "SEPARATED" ? "Pronta" : "Enviada"}</span>
            </div>
            <div className="flex w-full gap-10 items-start text-theme-primary border-b-[1px] border-theme-background p-3">
              <span className="w-1/5">Cliente:</span>
              <span className="w-4/5">{`${bagOrder?.user.first_name} ${bagOrder?.user.last_name}`}</span>
            </div>
            <div className="flex w-full gap-10 items-start text-theme-primary border-b-[1px] border-theme-background p-3">
              <span className="w-1/5">Prazo:</span>
              <span className="w-4/5">{getNextSaturdayDate()}</span>
            </div>
            <div className="text-theme-primary p-3">Conteúdo:</div>
            <div className="pl-3 pb-3 text-theme-primary">
              {bagOrder?.orders.map((order: any) => (
                <div key={order.id}>
                  {`${order.offer.amount}${order.offer.product.pricing === 'WEIGHT' ? 'g' : 'un'} - ${order.offer.product.name}`}
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
                  router.push(`/enviar-sacola/${bagOrder.id}/enviar`)
                  
                }}
              />
            ) : (
              <span className="text-center mt-6 text-slate-gray">Sacola já enviada!</span>
            )}
          </div>
        </div>
      )}
    </>
  );
}
