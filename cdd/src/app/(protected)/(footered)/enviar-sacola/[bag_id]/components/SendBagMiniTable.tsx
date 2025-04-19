"use client";

import { notFound, useParams } from "next/navigation";
import { useState } from "react";

import Modal from "@shared/components/Modal";
import TableSkeleton from "@shared/components/TableSkeleton";

import { BagStatus } from "@shared/types/bag-status";

import useFetchBag from "@cdd/hooks/bags/useFetchBag";
import useHandleBag from "@cdd/hooks/bags/useHandleBag";
import GroupOrder from "@shared/components/GroupOrder";
import HeaderDetail from "@shared/components/HeaderDetail";
import SelectInput from "@shared/components/SelectInput";
import TablePaginationControl from "@shared/components/TablePaginationControl";
import usePageQueryParams from "@shared/hooks/usePageQueryParams";
import convertStatus from "@shared/utils/convert-status";
import { getNextSaturdayDate } from "@shared/utils/get-next-saturday-date";

export default function SendBagMiniTable() {
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

  const { bag_id } = useParams();

  if (!bag_id) {
    notFound();
  }

  const { page } = usePageQueryParams();

  const { data: bag, isLoading: isLoadingFetchBag } = useFetchBag({
    bag_id: bag_id.toString(),
    page,
  });

  const { handleBag, isLoading: isLoadingHandleBag } = useHandleBag();

  const handleStatusBag = (bag_id: string, status: BagStatus["send"]) => {
    handleBag({
      bag_id,
      status,
      successMessage: `A sacola foi ${bagStatusOptions
        .find((option) => option.value === status)
        ?.label.toLowerCase()} com sucesso!`,
      successRedirect: "/enviar-sacola",
    });
  };

  const isLoading = isLoadingFetchBag || isLoadingHandleBag;

  return (
    <div className="w-full h-full flex flex-col justify-between items-center gap-3">
      {isLoading && <TableSkeleton />}
      {!isLoading && !bag && (
        <span className="text-center text-red-500">
          Erro ao carregar os dados da sacola
        </span>
      )}
      {!isLoading && bag && (
        <>
          <HeaderDetail
            id={bag.id}
            status={
              currentStatus === "SEPARATED"
                ? convertStatus(bag.status)?.name
                : undefined
            }
            selectStatus={
              currentStatus !== "SEPARATED" ? (
                <div className="w-[110px]">
                  <SelectInput
                    placeholder="Selecione o status"
                    options={bagStatusOptions}
                    onChange={(value) => {
                      setBagStatus(value);
                      setIsStatusChanged(value !== currentStatus);
                    }}
                    defaultOption={bagStatusOptions.find((option) =>
                      isStatusChanged
                        ? bagStatus === option.value
                        : option.value === bag.status
                    )}
                  />
                </div>
              ) : undefined
            }
            name={`${bag.customer.first_name} ${bag.customer.last_name}`}
            time={getNextSaturdayDate()}
            content={<GroupOrder orders={bag.orders} />}
          />
          <TablePaginationControl />
          <div className="w-full h-[15%] flex justify-center items-end">
            {bag.status === "SEPARATED" ? (
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
                  handleStatusBag(bag.id, "DISPATCHED");
                }}
              />
            ) : bag.status && isStatusChanged && bagStatus !== bag.status ? (
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
                  handleStatusBag(bag.id, bagStatus as BagStatus["send"]);
                }}
              />
            ) : (
              <>
                <span className="text-center mt-6 text-slate-gray">
                  {`Sacola já ${bagStatusOptions
                    .find((option) =>
                      isStatusChanged
                        ? bagStatus === option.value
                        : option.value === bag.status
                    )
                    ?.label.toLowerCase()}`}
                </span>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
