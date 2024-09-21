"use client";

import React, { useState } from "react";
import { Tooltip, Button, notification } from "antd";

import { HiOutlineInformationCircle } from "react-icons/hi";

import { PendingDeliveriesTable } from "./Table";

interface PendingDeliveriesProps {
  numberOfItems: number;
}

export function PendingDeliveries({ numberOfItems }: PendingDeliveriesProps) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

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

  return (
    <div className="w-full p-5 pt-5 pr-5 pl-5 rounded-2xl bg-white flex flex-col justify-around gap-8">
      <div className="flex justify-between items-start pr-0 pl-1">
        <div className="flex flex-col gap-1.5">
          <span className="pt-0.5 text-base leading-5.5 tracking-tight">Entregas pendentes</span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-battleship-gray">
              CDD - FURG
            </span>
            <Tooltip title={tooltipContent} trigger="click">
              <button className="font-semibold bg-battleship-gray text-white text-[12px] rounded-md px-2.5">
                ver endereço
              </button>
            </Tooltip>
          </div>
        </div>
        <button>
          <HiOutlineInformationCircle className="text-[24px] text-theme-primary" />
        </button>
      </div>
      <PendingDeliveriesTable numberOfItems={numberOfItems} />
    </div>
  );
}
