"use client";

import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { fetchBag } from "@cdd/_actions/bags/GET/fetch-bag";
import { handleBag } from "@cdd/_actions/bags/PATCH/handle-bag";

import Modal from "@shared/components/Modal";
import TableSkeleton from "@shared/components/TableSkeleton";

import { useHandleError } from "@shared/hooks/useHandleError";
import { BagStatus } from "@shared/types/bag-status";

import GroupOrder from "@shared/components/GroupOrder";
import HeaderDetail from "@shared/components/HeaderDetail";
import SelectInput from "@shared/components/SelectInput";
import { BagMergeDTO } from "@shared/interfaces/dtos";
import convertStatus from "@shared/utils/convert-status";
import { getNextSaturdayDate } from "@shared/utils/get-next-saturday-date";

export default function SendBagMiniTable() {
  const router = useRouter();

  const [bagOrder, setBagOrder] = useState<BagMergeDTO | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const [bagStatus, setBagStatus] = useState<string | undefined>(undefined);
  const [currentStatus, setCurrentStatus] = useState<string | undefined>(
    undefined
  );
  const [isStatusChanged, setIsStatusChanged] = useState(false);

  const bagStatusOptions = [
    { value: "DISPATCHED", label: "Enviada" },
    { value: "RECEIVED", label: "Entregue" },
    { value: "DEFERRED", label: "Retornada" },
  ];

  const { handleError } = useHandleError();

  const { bag_id } = useParams();

  if (!bag_id) {
    notFound();
  }

  useEffect(() => {
    setIsLoading(true);
    fetchBag({
      bag_id: bag_id as string,
    })
      .then((response) => {
        if (response.message) {
          handleError(response.message);
        } else if (response.data) {
          setBagOrder(response.data);
          setCurrentStatus(response.data.status);
          setBagStatus(response.data.status);
        }
      })
      .catch(() => {
        toast.error("Erro desconhecido.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [bag_id]);

  const handleStatusBag = (bag_id: string, status: BagStatus["send"]) => {
    handleBag({
      bag_id,
      status,
    })
      .then((response) => {
        if (response.message) {
          handleError(response.message);
        } else {
          const statusName =
            status === "RECEIVED"
              ? "entregue"
              : status === "DEFERRED"
              ? "retornada"
              : "enviada";
          sessionStorage.setItem(
            "data-sucess",
            JSON.stringify({
              title: `A oferta foi ${statusName}!`,
              description: `A sacola do cliente foi ${statusName}.`,
              button: {
                secondary: {
                  router: "/",
                  name: "Voltar para a tela inicial",
                },
                primary: {
                  router: "/enviar-sacola",
                  name: "Enviar outra sacola",
                },
              },
            })
          );
          router.push(`/sucesso`);
        }
      })
      .catch(() => {
        toast.error("Erro desconhecido.");
      });
  };

  return (
    <div className="w-full h-full flex flex-col justify-between">
      {isLoading ? (
        <TableSkeleton />
      ) : bagOrder ? (
        <>
          <HeaderDetail
            id={bagOrder.id}
            status={
              currentStatus === "SEPARATED"
                ? convertStatus(bagOrder.status)?.name
                : undefined
            }
            selectStatus={
              currentStatus !== "SEPARATED" ? (
                <SelectInput
                  options={bagStatusOptions}
                  onChange={(value) => {
                    setBagStatus(value);
                    setIsStatusChanged(value !== currentStatus);
                  }}
                  defaultOption={bagStatusOptions.find(
                    (option) => option.value === bagStatus
                  )}
                />
              ) : undefined
            }
            name={`${bagOrder.user.first_name} ${bagOrder.user.last_name}`}
            time={getNextSaturdayDate()}
            content={<GroupOrder orders={bagOrder.orders} />}
          />
          <div className="w-full flex justify-center items-end">
            {bagOrder.status === "SEPARATED" ? (
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
                  handleStatusBag(bagOrder.id, "DISPATCHED");
                }}
              />
            ) : bagOrder.status && isStatusChanged ? (
              <Modal
                titleOpenModal="Salvar"
                titleContentModal="Você tem certeza?"
                contentModal={`Ao alterar o status para ${bagStatusOptions
                  .find((option) => option.value === bagStatus)
                  ?.label.toLowerCase()}, o cliente será notificado que ela foi ${bagStatusOptions
                  .find((option) => option.value === bagStatus)
                  ?.label.toLowerCase()}.`}
                bgOpenModal="#00735E"
                titleCloseModal="Cancelar"
                titleConfirmModal="Confirmar"
                bgConfirmModal="#00735E"
                bgCloseModal="#EEF1F4"
                modalAction={() => {
                  handleStatusBag(bagOrder.id, bagStatus as BagStatus["send"]);
                }}
              />
            ) : (
              <>
                <span className="text-center mt-6 text-slate-gray">
                  Sacola já entregue!
                </span>
              </>
            )}
          </div>
        </>
      ) : (
        <span className="text-center text-red-500">
          Erro ao carregar os dados da sacola
        </span>
      )}
    </div>
  );
}
