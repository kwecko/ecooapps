"use client";

import { notFound, useParams } from "next/navigation";

import useFetchBag from "@cdd/hooks/bags/useFetchBag";
import useHandleBag from "@cdd/hooks/bags/useHandleBag";
import GroupOrder from "@shared/components/GroupOrder";
import HeaderDetail from "@shared/components/HeaderDetail";
import Modal from "@shared/components/Modal";
import TablePaginationControl from "@shared/components/TablePaginationControl";
import TableSkeleton from "@shared/components/TableSkeleton";
import usePageQueryParams from "@shared/hooks/usePageQueryParams";
import { BagStatus } from "@shared/types/bag-status";
import convertStatus from "@shared/utils/convert-status";
import { getNextSaturdayDate } from "@shared/utils/get-next-saturday-date";

export default function BagMiniTable() {
  const { bag_id } = useParams();

  if (!bag_id) {
    notFound();
  }

  const { page } = usePageQueryParams();

  const { data: bag, isLoading: isLoadingFetchBag } = useFetchBag({
    bag_id: bag_id.toString(),
    page,
  });

  console.log(bag);

  const { handleBag, isLoading: isLoadingHandleBag } = useHandleBag();

  const handleStatusBag = (bag_id: string, status: BagStatus["build"]) => {
    const statusConfig = {
      PENDING: {
        nextStatus: "SEPARATED",
        successMessage: "Sacola preparada com sucesso!",
      },
      SEPARATED: {
        nextStatus: "PENDING",
        successMessage: "A sacola foi alterada com sucesso!",
      },
    };

    const config = statusConfig[status];

    if (!config) {
      return;
    }

    handleBag({
      bag_id,
      status: config.nextStatus as BagStatus["build"],
      successMessage: config.successMessage,
      successRedirect: "/montar-sacola",
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
            status={convertStatus(bag.status)?.name}
            name={`${bag.customer.first_name} ${bag.customer.last_name}`}
            time={getNextSaturdayDate()}
            content={<GroupOrder orders={bag.orders} />}
          />
          <TablePaginationControl />
          <div className="w-full h-[15%] flex justify-center items-end">
            {bag?.status === "PENDING" ? (
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
                  handleStatusBag(bag_id as string, "PENDING");
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
                  handleStatusBag(bag_id as string, "SEPARATED");
                }}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
