"use client";

import IndividualProductTable from "@shared/components/IndividualProductTable";
import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import HeaderDetail from "./HeaderDetail";

import { fetchBox } from "@cdd/_actions/boxes/GET/fetch-box";
import { handleBoxStatus } from "@cdd/_actions/boxes/PATCH/handle-box-status";

import TableSkeleton from "@shared/components/TableSkeleton";
import Loader from "@shared/components/Loader";
import { useHandleError } from "@shared/hooks/useHandleError";
import { useLocalStorage } from "@shared/hooks/useLocalStorage";
import { BoxMergeDTO } from "@shared/interfaces/dtos";
import { convertStatus } from "@shared/utils/convert-status";
import { convertOfferAmount, convertUnit } from "@shared/utils/convert-unit";
import { getNextSaturdayDate } from "@shared/utils/get-next-saturday-date";

export default function FarmOrdersTable() {
  const { box_id } = useParams();

  const [farmOrders, setFarmOrders] = useState<BoxMergeDTO | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOrdersLoading, setIsOrdersLoading] = useState(false);

  const { handleError } = useHandleError();
  const { getFromStorage } = useLocalStorage();

  if (!box_id) {
    notFound();
  }

  const fetchBoxData = async () => {
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
      });
  };

  useEffect(() => {
    fetchBoxData().finally(() => {
      setIsLoading(false);
    });
  }, [box_id]);

  const handleApproveFarmOffer = async (order_id: string) => {
    setIsOrdersLoading(true);

    await handleBoxStatus({
      box_id: box_id as string,
      order_id: order_id as string,
      status: "RECEIVED",
    })
      .then(async (response) => {
        if (response.message) {
          handleError(response.message);
        } else {
          toast.success("Oferta aprovada com sucesso!");
          await fetchBoxData();
        }
      })
      .catch(() => {
        toast.error("Erro desconhecido.");
      })
      .finally(() => {
        setIsOrdersLoading(false);
      });
  };

  const handleRejectFarmOffer = async (order_id: string) => {
    setIsOrdersLoading(true);
    await handleBoxStatus({
      box_id: box_id as string,
      order_id: order_id as string,
      status: "CANCELLED",
    })
      .then(async (response) => {
        if (response.message) {
          handleError(response.message);
        } else {
          toast.success("Oferta rejeitada com sucesso!");
          await fetchBoxData();
        }
      })
      .catch(() => {
        toast.error("Erro desconhecido.");
      })
      .finally(() => {
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
      {isOrdersLoading ? (
        <Loader className="mt-3" loaderType="component" />
      ) : (
        <IndividualProductTable
          headers={headers}
          info={info}
          farmOrders={farmOrders}
          onApprove={handleApproveFarmOffer}
          onReject={handleRejectFarmOffer}
        />
      )}
    </div>
  );
}
