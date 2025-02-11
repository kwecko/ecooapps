"use client";

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";

import useListStats from "@admin/hooks/useListStats";

import { HiOutlineInformationCircle } from "react-icons/hi";

import Card from "@admin/app/components/Card";
import Copyright from "@admin/app/components/Copyright";
import DaysGraph from "@admin/app/components/DaysGraph";
import ListBagsTable from "@admin/app/components/ListBagTable";
import Button from "@shared/components/Button";
import MonthsGraph from "@admin/app/components/MonthsGraph";
import RevenueByPaymentMethod from "@admin/app/components/RevenueByPaymentMethod";
import OpenPaymentsGraph from "@admin/app/components/OpenPaymentsGraph";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Home() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [selectedGraph, setSelectedGraph] = useState("Vendas nos últimos meses");


  const { data: stats } = useListStats();

  useEffect(() => {
    setDate(new Date().toLocaleDateString("pt-BR"));
    setTime(new Date().toLocaleTimeString("pt-BR"));
  }, []);

  return (
    <div className="h-full overflow-hidden">
      <div className="grid grid-cols-10 h-full gap-14 overflow-y-auto">
        <div className="flex flex-col h-full col-span-6 gap-12">
          <Card
            title="Informações de acesso"
            className="w-full flex flex-col gap-4 justify-between items-stretch p-6"
            size="h-44 p-5"
          >
            <div className="text-xs font-inter">Unidade:</div>
            <div className="text-4xl font-semibold text-slate-blue">
              Armazém FURG
            </div>
            <div className="text-xs font-inter mt-12">
              Acessado dia: <span className="font-bold"> {date} </span>| Hora:{" "}
              <span className="font-bold"> {time} </span>
            </div>
          </Card>

          <Card title="Últimas vendas" className="w-2/3">
            <div className="max-h-112 overflow-y-auto">
              <ListBagsTable />
            </div>
          </Card>

          <div className="mt-auto mr-auto">
            <Copyright type="primary" />
          </div>
        </div>

        <div className="flex flex-col col-span-4">
          <Card title="Vendas nesse mês" className="w-full" size="h-50 p-5">
            <div className="flex items-top justify-between gap-20">
              <div className="text-4xl font-semibold text-rain-forest">
                {stats?.revenue
                  ? `R$ ${(stats.revenue).toLocaleString(
                      "pt-BR",
                      { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                    )}`
                  : ""}
              </div>
              <button>
                <HiOutlineInformationCircle className="text-2xl text-theme-primary" />
              </button>
            </div>

            <div className="font-inter text-theme-primary">
              Produtores:{" "}
              {stats?.revenue
                ? `R$ ${((stats.revenue) - (stats.revenue * 0.2)).toLocaleString("pt-BR", {
                    minimumFractionDigits: 2, maximumFractionDigits: 2,
                  })}`
                : ""}
            </div>

            <div className="font-inter text-theme-primary">
              Taxas:{" "}
              {stats?.revenue
                ? `R$ ${(stats.revenue * 0.2).toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`
                : ""}
            </div>

            <Button className="mt-4 text-ms font-inter font-semibold w-full h-12 bg-rain-forest rounded-md text-white">
              Visualizar as vendas
            </Button>
          </Card>
          
          <div className="mt-6">
            <Card
              title={selectedGraph}
              className="w-full"
              size="h-48 p-5"
            >
              <div>              
                <div className="h-40">
                  {selectedGraph === "Vendas nos últimos meses" && stats?.monthly && (
                    <MonthsGraph stats={stats?.monthly} />
                  )}
                  {selectedGraph === "Vendas por tipo de pagamento" && (
                    <RevenueByPaymentMethod stats={stats?.revenueByMethod} />
                  )}
                  {selectedGraph === "Pagamentos em aberto" && (
                    <OpenPaymentsGraph stats={stats?.openPayments} />
                  )}
                </div>
              </div>
            </Card>
            <div className="flex gap-4 mt-2 justify-center">
              <Button
                className={`${
                  selectedGraph === "Vendas nos últimos meses"
                  ? "bg-rain-forest"
                  : "bg-gray-400"
                  } rounded-full w-4 h-4 flex items-center justify-center transition-all duration-300`}
                  onClick={() => setSelectedGraph("Vendas nos últimos meses")
                }
              />
              <Button
                className={`${
                  selectedGraph === "Vendas por tipo de pagamento"
                  ? "bg-rain-forest"
                  : "bg-gray-400"
                  } rounded-full w-4 h-4 flex items-center justify-center transition-all duration-300`}
                  onClick={() => setSelectedGraph("Vendas por tipo de pagamento")
                }
              />
              <Button
                className={`${
                  selectedGraph === "Pagamentos em aberto"
                  ? "bg-rain-forest"
                  : "bg-gray-400"
                  } rounded-full w-4 h-4 flex items-center justify-center transition-all duration-300`}
                  onClick={() => setSelectedGraph("Pagamentos em aberto")                        
                }
              />
            </div>
          </div>
          
          <div className="mt-5">
            <Card title="Vendas por dia" className="w-full" size="h-50 p-5">
              <div className="h-40">
                {stats?.daily && <DaysGraph stats={stats?.daily} />}
              </div>
            </Card>
          </div>
          
        </div>
      </div>
    </div>
  );
}
