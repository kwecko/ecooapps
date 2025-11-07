"use client";

import IndividualProductTable from "@shared/components/IndividualProductTable";
import { notFound, useParams } from "next/navigation";
import { useState } from "react";
import HeaderDetail from "./HeaderDetail";

import useFetchBox from "@cdd/hooks/boxes/useFetchBox";
import useHandleBox from "@cdd/hooks/boxes/useHandleBox";
import EmptyBoxInformation from "@shared/components/EmptyBoxInformation";
import Loader from "@shared/components/Loader";
import TablePaginationControl from "@shared/components/TablePaginationControl";
import TableSkeleton from "@shared/components/TableSkeleton";
import usePageQueryParams from "@shared/hooks/usePageQueryParams";
import { convertStatus } from "@shared/utils/convert-status";
import { convertOfferAmount, convertUnit } from "@shared/utils/convert-unit";
import { getNextSaturdayDate } from "@shared/utils/get-next-saturday-date";

export default function FarmOrdersTable() {
  const { box_id } = useParams();

  if (!box_id) {
    notFound();
  }

  const { page } = usePageQueryParams();

  const {
    data: farmOrders,
    isLoading,
    fetchBox,
  } = useFetchBox({ box_id: box_id.toString(), page: page });

  const { handleBox } = useHandleBox();

  const [isOrdersLoading, setIsOrdersLoading] = useState(false);

  const handleApproveFarmOffer = async (order_id: string) => {
    setIsOrdersLoading(true);

    await handleBox({
      box_id: box_id as string,
      order_id: order_id as string,
      status: "RECEIVED",
      successMessage: "Oferta aprovada com sucesso!",
    });

    await fetchBox().finally(() => {
      setIsOrdersLoading(false);
    });
  };

  const handleRejectFarmOffer = async (order_id: string) => {
    setIsOrdersLoading(true);

    await handleBox({
      box_id: box_id as string,
      order_id: order_id as string,
      status: "REJECTED",
      successMessage: "Oferta rejeitada com sucesso!",
    });

    await fetchBox().finally(() => {
      setIsOrdersLoading(false);
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
        detail:
          convertOfferAmount(detail.amount, detail.offer.product.pricing) +
          " " +
          convertUnit(detail.offer.product.pricing),
      },
      { detail: detail.offer.product.name },
      { detail: convertStatus(detail.status).icon, style: "text-center" },
    ],
  }));

  return (
    <div className="w-full h-full flex flex-col justify-between gap-2 items-center">
      <HeaderDetail
        id={farmOrders.id}
        orders={farmOrders.orders.length}
        status={convertStatus(farmOrders.status).name}
        name={farmOrders.farm.name}
        time={getNextSaturdayDate()}
      />
      {isOrdersLoading ? (
        <Loader className="mt-3" loaderType="component" />
      ) : (
        <>
          {farmOrders.orders.length === 0 && (
            <EmptyBoxInformation style="m-auto">
              Nenhuma Caixa Encontrada!
            </EmptyBoxInformation>
          )}
          {farmOrders.orders.length > 0 && (
            <IndividualProductTable
              headers={headers}
              info={info}
              farmOrders={farmOrders}
              onApprove={handleApproveFarmOffer}
              onReject={handleRejectFarmOffer}
            />
          )}
          <TablePaginationControl />
        </>
      )}
    </div>
  );
}
