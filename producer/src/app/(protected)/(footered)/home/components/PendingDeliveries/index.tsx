"use client";

import { Tooltip } from "antd";
import Link from "next/link";

import { HiOutlineInformationCircle } from "react-icons/hi";

import Button from "@shared/components/ButtonV2";
import Card from "@shared/components/Card";
import { PendingDeliveriesTable } from "./PendingDeliveriesTable";

import CustomModal from "@shared/components/CustomModal";
import { toast } from "sonner";

export function PendingDeliveries() {
  const address = [
    "UNIVERSIDADE FEDERAL DO RIO GRANDE - FURG CAMPUS CARREIROS",
    "Av. Itália, km 8, s/n - Bairro Carreiros CEP: 96203-900 - Rio Grande/RS",
    "Referência: Antigo prédio do NUDESE, próximo ao prédio do CIDEC e ao lado do prédio da INOVATIO.",
  ];

  const handleCopyAddress = () => {
    navigator.clipboard
      .writeText(address.reduce((acc, curr) => `${acc}\n${curr}`))
      .then(() => {
        toast.success("Endereço copiado para a área de transferência.");
      });
  };

  const tooltipContent = (
    <div className="flex flex-col p-2 text-theme-default gap-4">
      <div className="flex flex-col gap-2 text-xs">
        <h3 className="text-base font-semibold w-full text-center">
          Endereço do CDD
        </h3>
        {address.map((line, index) => (
          <span key={index}>{line}</span>
        ))}
      </div>
      <div className="flex flex-col justify-between items-stretch gap-2 ">
        <Link href="https://maps.app.goo.gl/SGVoUf6Vs4LC3UZQ9" target="_blank">
          <Button variant="default" className="w-full h-9 py-0 text-sm mt-0">
            Abrir no Maps
          </Button>
        </Link>
        <Button
          variant="light"
          onClick={handleCopyAddress}
          className="w-full h-9 py-0 text-sm"
          border
        >
          Copiar endereço
        </Button>
      </div>
    </div>
  );

  return (
    <Card className="w-full py-5.5 px-5 rounded-2xl bg-white flex flex-col justify-around gap-5 max-h-96">
      <div className="flex justify-between items-start gap-2">
        <div className="pt-0 pl-1 flex flex-col text-base leading-5.5 tracking-tight-2 gap-1.75">
          <span className="text-theme-default">Entregas pendentes</span>
          <div className="flex gap-2">
            <span className="text-xs text-battleship-gray gap-2.75 flex items-start justify-start">
              CDD - FURG
              <Tooltip title={tooltipContent} trigger="click" color="white">
                <button className="font-semibold bg-battleship-gray text-white text-xs py-0.25 px-2.5 rounded-1">
                  ver endereço
                </button>
              </Tooltip>
            </span>
          </div>
        </div>
        <CustomModal
          titleContentModal="Entregas Pendentes"
          contentModal="Aqui estão os pedidos que já foram feitos e estão esperando que você envie para o Centro de Distribuição (CDD)."
          bgConfirmModal="#2F4A4D"
          titleConfirmModal="Ok"
          buttonOpenModal={
            <HiOutlineInformationCircle className="text-2xl text-theme-primary" />
          }
        />
      </div>
      <PendingDeliveriesTable />
    </Card>
  );
}
