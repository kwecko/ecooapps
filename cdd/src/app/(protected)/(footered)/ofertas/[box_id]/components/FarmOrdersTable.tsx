"use client";

import IndividualProductTable from "@shared/components/IndividualProductTable";
import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import HeaderDetail from "./HeaderDetail";

import { fetchBox } from "@cdd/_actions/boxes/GET/fetch-box";

import TableSkeleton from "@shared/components/TableSkeleton";
import { useHandleError } from "@shared/hooks/useHandleError";
import { useLocalStorage } from "@shared/hooks/useLocalStorage";
import { BoxMergeDTO } from "@shared/interfaces/dtos";
import { convertStatus } from "@shared/utils/convert-status";
import { convertOfferAmount, convertUnit } from "@shared/utils/convert-unit";
import { getNextSaturdayDate } from "@shared/utils/get-next-saturday-date";

export default function FarmOrdersTable() {
  const router = useRouter();
  const { box_id } = useParams();

  const [farmOrders, setFarmOrders] = useState<BoxMergeDTO | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { handleError } = useHandleError();
  const { getFromStorage } = useLocalStorage();

  if (!box_id) {
    notFound();
  }

  useEffect(() => {
    (async () => {
      const cycle = getFromStorage("selected-cycle");

      if (!cycle) {
        toast.error("Selecione um ciclo para receber ofertas!");
        return;
      }

      await fetchBox({
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

  const status =
    farmOrders.verified === farmOrders.orders.length ? "VERIFIED" : "PENDING";

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <HeaderDetail
        id={farmOrders?.id.split("-", 1).toString().toUpperCase()}
        status={convertStatus(status).name}
        name={farmOrders.catalog.farm.name}
        time={getNextSaturdayDate()}
      />

      <IndividualProductTable
        headers={headers}
        info={info}
        farmOrders={farmOrders}
      />
    </div>
  );
}
