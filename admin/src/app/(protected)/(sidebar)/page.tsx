'use client';

import { useEffect } from "react";

import useListBags from "@admin/hooks/useListBags";

import { HiOutlineInformationCircle } from "react-icons/hi";

import Button from "@shared/components/Button";
import Card from "@admin/app/components/Card";

export default function Home() {

  const {
    data: bags,
    updateData,
    isLoading,
  } = useListBags({
    page: 1,
  });

  console.log(bags);

  return (
    <div>
      <div className="flex h-full gap-14">
      <div className="flex flex-col gap-12 w-2/3">
        <Card 
          title="Informações de acesso"
          className="w-2/3"
          size="h-44"
        >
          <div className="text-xs font-inter">Unidade:</div>
          <div className="text-4xl font-semibold text-slate-blue">Armazém FURG</div>
          <div className="text-xs mt-12 font-inter">
            IP: <span className="font-bold"> 192.158.1.38 </span>
            | Acessado dia: <span className="font-bold"> 02-11-2024 </span>
            | Hora: <span className="font-bold"> 21:04</span>
          </div>
        </Card>
        <Card 
          title="Últimas vendas"
          className="w-2/3"
        >
        </Card>
      </div>
      <div className="flex flex-col gap-12 w-1/3">
        <Card 
          title="Vendas nesse mês"
          className="w-full"
          size="h-44"
        >
          <div className="flex items-top justify-between gap-20">
            <div className="text-4xl font-semibold text-rain-forest">R$ 1.893,44</div>
            <button>
              <HiOutlineInformationCircle className="text-2xl text-theme-primary" />
            </button>
          </div>
          <div className="font-inter text-theme-primary">
            Taxas: R$ 378,69
          </div>
          <Button className=" mt-3 text-ms font-inter font-semibold w-full h-12 bg-rain-forest rounded-md text-white">
            Visualizar as vendas
          </Button>
        </Card>
        <Card 
          title="Faturamento dos últimos meses"
          className="w-full"
          size="h-50"
        >

        </Card>
        <Card 
          title="Vendas por dia"
          className="w-full"
          size="h-48"
        >
          
        </Card>
      </div>
    </div>
    
    </div>
  );
}
