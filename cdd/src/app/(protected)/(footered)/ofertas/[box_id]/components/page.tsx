"use client";

import { useEffect, useState } from "react";
import { notFound, useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import HeaderDetail from "./HeaderDetail";
import Table from "../../components/table";
import { handleOrderDelivery } from "@cdd/app/_actions/order/handle-order-delivery";
import { getBoxOrders } from "@cdd/app/_actions/box/get-box-orders";

import { useLocalStorage } from "@shared/hooks/useLocalStorage";
import Modal from "@shared/components/Modal";
import { convertUnit } from "@shared/utils/convert-unit";
import { convertStatus } from "@shared/utils/convert-status";
import { getNextSaturdayDate } from "@shared/utils/get-next-saturday-date"
import { useHandleError } from "@shared/hooks/useHandleError";
import { FarmOrders } from "@shared/interfaces/farm-orders";
import TableSkeleton from "@shared/components/TableSkeleton";

export default function FarmOrdersTable() {
  const router = useRouter();
  const { box_id } = useParams();

  const [farmOrders, setFarmOrders] = useState<FarmOrders | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { handleError } = useHandleError();
  const { getFromStorage } = useLocalStorage();

  if (!box_id) {
    notFound();
  }

  useEffect(() => {
    (async () => {
      const cycle= getFromStorage("selected-cycle");

      if (!cycle) {
        toast.error("Selecione um ciclo para receber ofertas!");
        return;
      }

      const { id } = cycle

      await getBoxOrders({
        box_id: box_id as string,
      })
        .then((response: any) => {
          if (response.message) {
            const messageError = response.message as string;

            handleError(messageError);
          } else if (response.data) {
            setFarmOrders(response.data);
            return;
          }
        })
        .catch((error) => {
          toast.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    })();
  }, [box_id]);

  const approveBox = () => {
    handleOrderDelivery({
      box_id: box_id as string,
      status: "RECEIVED",
    })
      .then((response) => {
        if (response.message) {
          const messageError = response.message as string;
          handleError(messageError);
        } else {
          sessionStorage.setItem(
            "data-sucess",
            JSON.stringify({
              title: "A oferta foi aprovada!",
              description: "A oferta do produtor foi aprovada.",
              button: {
                secundary: "/",
                primary: "/ofertas",
              },
            })
          );
          router.push("/success");
        }
      })
      .catch(() => {
        toast.error("Erro desconhecido.");
      });
  };

  const cancelBox = () => {
    handleOrderDelivery({
      box_id: box_id as string,
      status: "CANCELLED",
    })
      .then((response) => {
        if (response.message) {
          const messageError = response.message as string;
          handleError(messageError);
        } else {
          sessionStorage.setItem(
            "data-sucess",
            JSON.stringify({
              title: "A oferta foi Reprovada!",
              description: "A oferta do produtor foi REPROVADA.",
              button: {
                secundary: "/",
                primary: "/ofertas",
              },
            })
          );
          router.push("/success");
        }
      })
      .catch(() => {
        toast.error("Erro desconhecido.");
      });
  };

  if (isLoading) {
    return <TableSkeleton />;
  }

  if (!farmOrders) {
    return null;
  }

  const headers = [
    { label: "Quant.", style: "w-[30%]" },
    { label: "Produto", style: "w-1/2" },
    { label: "Status", style: "w-1/5 text-center" },
  ];

  const info = farmOrders.orders.map((detail) => ({
    id: detail.id,
    data: [
      {
        detail: detail.amount + convertUnit(detail.offer.product.pricing), // quant.
      },
      { detail: detail.offer.product.name }, // produto
      { detail: convertStatus(detail.status).icon, style: "text-center" }, // status
    ],
  }));

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <HeaderDetail
        id={farmOrders?.id.split("-", 1).toString().toUpperCase()}
        status={convertStatus(farmOrders.status).name}
        name={farmOrders.catalog.farm.name}
        time={getNextSaturdayDate()}
      />

      <Table headers={headers} info={info} />

      <div className="w-full h-[10%] flex gap-2 justify-center items-end mt-4">
        <Modal
          titleContentModal="Você tem certeza?"
          contentModal="Após rejeitar a entrega essa operação não poderá ser desfeita. Em caso de erro, entre em contato com o suporte."
          titleCloseModal="Cancelar"
          titleConfirmModal="Rejeitar"
          titleOpenModal="Rejeitar"
          bgOpenModal="#FF7070"
          bgConfirmModal="#FF7070"
          bgCloseModal="#EEF1F4"
          modalAction={cancelBox}
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
          modalAction={approveBox}
        />
      </div>
    </div>
  );
}
