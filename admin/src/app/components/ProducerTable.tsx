"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

import { handleFarmStatus } from "../../_actions/farms/PATCH/handle-farm-status";

import { FarmDTO } from "@shared/interfaces/dtos/farm-dto";
import convertStatus from "@shared/utils/convert-status";
import Button from "@shared/components/Button";
import ModalV2 from "@shared/components/ModalV2";
import OrderTable from "@shared/components/OrderTable";
import producer from '@shared/assets/public/producer.png';

interface ProducerTableProps {
  farms?: FarmDTO[];
}

export default function ProducerTable({ farms }: ProducerTableProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedFarm, setSelectedFarm] = useState<FarmDTO | null>(null);
  const router = useRouter();
  const today = dayjs();

  const handleRowClick = (id: string) => {
    const farm = farms?.find((farm: FarmDTO) => farm.id === id);
    setSelectedFarm(farm || null);
    setIsOpen((prevState) => !prevState);
  };

  const handleFarmStatusChange = (status: "ACTIVE" | "PENDING" | "INACTIVE") => {
    if (!selectedFarm) return;
    handleFarmStatus({ farm_id: selectedFarm.id, status });
    setIsOpen((prevState) => !prevState);
    router.push('/');
  };

  const getColorStatus = (status: "ACTIVE" | "PENDING" | "INACTIVE") => {
    if (status === "ACTIVE") return "bg-rain-forest";
    else if (status === "INACTIVE") return "bg-error";
    return "bg-steel-shadow";
  }

  const headers = [
    { label: "Foto" },
    { label: "Nome" },
    { label: "Agronegócio" },
    { label: "Talão" },
    { label: "Celular" },
    { label: "Status" },
  ];

  const info = 
    farms?.map((item) => ({
      id: item.id,
      data: [
        { 
          detail: item.admin.photo 
            ? <img src={item.admin.photo} alt="Foto do produtor" className="w-18 h-18 rounded-full" />
            : <img src={producer.src} alt="Foto do produtor" className="w-18 h-18 rounded-full" />
        },
        { detail: item.admin.first_name + " " + item.admin.last_name },
        { detail: item.name },
        { detail: item.tally },
        { detail: item.admin.phone },
        {
          detail: (
            <Button
              className={`flex ${getColorStatus(item.status)} text-white justify-center items-center w-25 h-9 text-sm font-semibold rounded-full`}
            >
              {convertStatus(item.status).name}
            </Button>
          )
        }
      ],
    })) || [];

  return (
    <>
      <OrderTable type="admin" headers={headers} info={info} onRowClick={handleRowClick} />
      {selectedFarm && (
        <ModalV2
          isOpen={isOpen}
          closeModal={handleRowClick.bind(null, selectedFarm.id)}
          title="Verificar produtor"
        >
          <div className="w-full h-full rounded-md bg-white font-inter text-theme-primary">
          <div className="w-full h-full rounded-md bg-white font-inter text-theme-primary">
            {[
              { label: "Nome", value: `${selectedFarm.admin.first_name} ${selectedFarm.admin.last_name}` },
              { label: "Status", value: convertStatus(selectedFarm.status).name, isBold: true },
              { label: "Solicitação", value: today.format("DD/MM/YYYY [às] HH:mm:ss") },
              { label: "Negócio", value: selectedFarm.name },
              { label: "Talão", value: selectedFarm.tally },
              { label: "Email", value: selectedFarm.admin.email },
              { label: "Celular", value: selectedFarm.admin.phone },
            ].map((item, index) => (
              <div key={index}>
              <div className="flex w-full h-12 items-center pl-4 pt-1">
                <span className="w-1/4">{item.label}:</span>
                <span className={`w-3/4 ${item.isBold ? 'font-bold' : ''}`}>{item.value}</span>
              </div>
              <hr className="w-full border-theme-background"/>
              </div>
            ))}
          </div>
          </div>
          <div className="w-full flex pt-5 gap-4 font-inter font-semibold">
            <Button 
              className="w-full h-14 rounded-md text-white bg-error"
              onClick={() => handleFarmStatusChange("INACTIVE")}
            >
              Rejeitar
            </Button>
            <Button 
              className="w-full h-14 rounded-md text-white bg-rain-forest"
              onClick={() => handleFarmStatusChange("ACTIVE")}
            >
              Aprovar
            </Button>
          </div>
        </ModalV2>
      )}
    </>
  );
}