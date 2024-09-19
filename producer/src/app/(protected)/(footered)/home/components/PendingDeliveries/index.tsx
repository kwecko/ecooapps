"use client";

import React, { useEffect, useState } from "react";
import { Tooltip, Button, notification } from "antd";

import { HiOutlineInformationCircle } from "react-icons/hi";

import { PendingDeliveriesTable } from "./Table";
import Loader from "@shared/components/Loader";

import { getCycleSelected } from "@shared/utils/getCycleSelected";
import { getBoxesWithOrders } from "@shared/_actions/box/get-boxes-with-orders";
import { getBoxOrders } from "@shared/_actions/box/get-box-orders";
import { getUser } from "@shared/_actions/account/get-user"

export interface IPendingDeliveries {
  id: string
  bag_id: string
  offer: Offer
  status: string
  amount: number
  created_at: string
  updated_at: any
}

export interface Offer {
  id: string
  amount: number
  price: number
  description: any
  catalog_id: string
  product: Product
  created_at: string
  updated_at: any
}

export interface Product {
  id: string
  name: string
  image: string
  pricing: string
  created_at: string
  updated_at: any
}


export function PendingDeliveries() {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [pendingDeliveries, setPendingDeliveries] = useState<IPendingDeliveries[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
      try {

        const cycleSelected = await getCycleSelected();
        const user = await getUser()
        const dataBoxes = await getBoxesWithOrders({ cycle_id: cycleSelected.id, page: 0, name: user.data.first_name })
        const caixa = await getBoxOrders({ box_id: dataBoxes.data[0].id })
        setPendingDeliveries(caixa.data.orders)
      } catch (error) {
        console.log('error')
      } finally {
        setIsLoading(false);
      }
    })()
  }, []);

  if (isLoading) {
    return (
      <Loader
        appId="PRODUCER"
        loaderType="page"
        className="mt-10"
      />
    )
  }

  return (
    <div
      className={`mt-5 w-full py-5.5 px-6 rounded-2xl bg-white flex flex-col justify-around gap-4 max-h-96 overflow-y-auto`}
    >
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <span className="text-theme-default">Entregas pendentes</span>
          <div>
            <span className="text-xs text-battleship-gray">
              CDD - FURG{"   "}
              <Tooltip title={tooltipContent} trigger="click">
                <button className="font-semibold bg-battleship-gray text-white text-[12px] rounded-md h-[18px] w-24">
                  ver endereço
                </button>
              </Tooltip>
            </span>
          </div>
        </div>
        <button>
          <HiOutlineInformationCircle className="text-[24px] text-slate-blue" />
        </button>
      </div>
      <PendingDeliveriesTable pendingDeliveries={pendingDeliveries} />
    </div>
  );
}
