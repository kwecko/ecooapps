"use client";

import { useEffect, useState } from "react";
import { BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, Chart as ChartJS } from "chart.js";

import useListStats from "@admin/hooks/useListStats";

import { HiOutlineInformationCircle } from "react-icons/hi";

import Button from "@shared/components/Button";
import Card from "@admin/app/components/Card";
import ListBagsTable from "@admin/app/components/ListBagTable";
import MonthsGraph from "@admin/app/components/MonthsGraph";
import DaysGraph from "@admin/app/components/DaysGraph";
import Copyright from "@admin/app/components/Copyright";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Home() {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  const { data: stats } = useListStats();

  useEffect(() => {
    setDate(new Date().toLocaleDateString('pt-BR'));
    setTime(new Date().toLocaleTimeString('pt-BR'));
  }, []);

  return (
    <div className="flex h-full gap-14">
      <div className="flex flex-col gap-10 w-2/3">
        <Card
          title="Informações de acesso"
          className="w-2/3"
          size="h-44 p-5"
        >
          <div className="text-xs font-inter">Unidade:</div>
          <div className="text-4xl font-semibold text-slate-blue">Armazém FURG</div>
          <div className="text-xs mt-12 font-inter">
            Acessado dia: <span className="font-bold"> {date} </span>
            | Hora: <span className="font-bold"> {time} </span>
          </div>
        </Card>

        <Card title="Últimas vendas" className="w-2/3">
        <div className="max-h-72 overflow-y-auto">
          <ListBagsTable />
        </div>
        </Card>

        <div className="mr-110 mt-auto">
          <Copyright type="primary" />
        </div>

      </div>

      <div className="flex flex-col gap-10 w-1/3">
        <Card
          title="Vendas nesse mês"
          className="w-full"
          size="h-44 p-5"
        >
          <div className="flex items-top justify-between gap-20">
            <div className="text-4xl font-semibold text-rain-forest">
                {stats?.revenue ? `R$ ${(stats.revenue - (stats.revenue * 0.2)).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : ''}
            </div>
            <button>
              <HiOutlineInformationCircle className="text-2xl text-theme-primary" />
            </button>
          </div>

          <div className="font-inter text-theme-primary">Taxas: {stats?.revenue ? `R$ ${(stats.revenue * 0.2).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : ''}</div>

          <Button className="mt-4 text-ms font-inter font-semibold w-full h-12 bg-rain-forest rounded-md text-white">
            Visualizar as vendas
          </Button>
        </Card>

        <Card
          title="Faturamento dos últimos meses"
          className="w-full"
          size="h-50 p-5"
        >
          <div className="h-40">
            {stats?.monthly && (
              <MonthsGraph stats={stats?.monthly} />
            )}
          </div>
        </Card>

        <Card
          title="Vendas por dia"
          className="w-full"
          size="h-48"
        >
          {stats?.daily && (
            <DaysGraph stats={stats?.daily} />
          )}
        </Card>
      </div>
    </div>
  );
}
