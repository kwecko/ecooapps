"use client";

import React, { useEffect, useState } from "react";
import { Tooltip, Button, notification } from "antd";

import { HiOutlineInformationCircle } from "react-icons/hi";

import { PendingDeliveriesTable } from "./Table";
import Loader from "@shared/components/Loader";

import { getBoxeCurrent } from "@shared/_actions/boxe/get-boxe-current";
import { IPendingDeliveries } from "@shared/interfaces/offer";
import { toast } from "sonner";
import { useCycleProvider } from "@shared/context/cycle";
import { useHandleError } from "@shared/hooks/useHandleError"

export function PendingDeliveries() {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [pendingDeliveries, setPendingDeliveries] = useState<IPendingDeliveries[] | undefined>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { cycle } = useCycleProvider();

  const { handleError } = useHandleError()

  const handleCopyAddress = () => {
    const address =
      "UNIVERSIDADE FEDERAL DO RIO GRANDE - FURG CAMPUS CARREIROS Av. Itália, km 8, s/n - Bairro Carreiros CEP: 96203-900 - Rio Grande/RS Referência: Antigo prédio do NUDESE, próximo ao prédio do CIDEC e ao lado do prédio da INOVATIO.";
    navigator.clipboard.writeText(address).then(() => {
      notification.open({
        message: "Endereço Copiado",
        description: "Endereço copiado para a área de transferência.",
      });
      setIsTooltipVisible(false);
    });
  };

  const tooltipContent = (
    <div>
      <p>
        <strong>Endereço do CDD:</strong>
        <br />
        UNIVERSIDADE FEDERAL DO RIO GRANDE - FURG CAMPUS CARREIROS
        <br />
        Av. Itália, km 8, s/n - Bairro Carreiros CEP: 96203-900 - Rio Grande/RS
        <br />
        Referência: Antigo prédio do NUDESE, próximo ao prédio do CIDEC e ao
        lado do prédio da INOVATIO.
      </p>
      <Button
        type="link"
        href="https://maps.app.goo.gl/5ZrUfgwhA7evFBXi9"
        target="_blank"
        style={{ width: "100%" }}
      >
        Abrir no Maps
      </Button>
      <Button
        type="primary"
        style={{ width: "100%" }}
        onClick={handleCopyAddress}
      >
        Copiar endereço
      </Button>
    </div>
  );

  useEffect(() => {
    // IIFE
    (async () => {
      setIsLoading(true);

      if (!cycle) {
        setPendingDeliveries(undefined);
        setIsLoading(false);
        return;
      }

      getBoxeCurrent({ cycle_id: cycle.id })
        .then((response) => {
          if (response.message) {
            handleError(response.message)
          } else {
            const data: IPendingDeliveries[] = response.data.orders

            const ordersFiltered = data.filter(item => item.status === 'PENDING');

            setPendingDeliveries(ordersFiltered);
          }
        })
        .catch(() => {
          toast.error("Erro desconhecido.")
        })
        .finally(() => {
          setIsLoading(false);
        })
    })()
  }, [cycle]);

  if (isLoading) {
    return (
      <Loader
        loaderType="component"
        className="mt-10"
      />
    )
  }

  return (
    <div
      className={`w-full py-5.5 px-6 rounded-2xl bg-white flex flex-col justify-around gap-4 max-h-96 overflow-y-auto`}
    >
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <span className="text-theme-default">Entregas pendentes</span>
          <div className="flex gap-2">
            <span className="text-xs text-battleship-gray gap-2 flex">
              CDD - FURG{"   "}
              <Tooltip title={tooltipContent} trigger="click">
                <button className="font-semibold bg-battleship-gray text-white text-xs rounded-md h-4.5 w-24">
                  ver endereço
                </button>
              </Tooltip>
            </span>
          </div>
        </div>
        <button>
          <HiOutlineInformationCircle className="text-2xl text-slate-blue" />
        </button>
      </div>
      <PendingDeliveriesTable pendingDeliveries={pendingDeliveries} />
    </div>
  );
}
