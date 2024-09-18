"use client";

import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";
import DateInput from '@shared/components/DateInput';

import ButtonV2 from "@shared/components/ButtonV2";
import { useLocalStorage } from "@shared/hooks/useLocalStorage";

export default function Home() {
  const [initialDate, setInitialDate] = useState('');
  const [finalDate, setFinalDate] = useState('');

  const { getFromStorage } = useLocalStorage();

  const generateCurrentTime = () => {
    const date = new Date();

    const dateFormatted = new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);

    const hourFormatted = new Intl.DateTimeFormat('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(date);

    return `${dateFormatted}-${hourFormatted}`
  }

  const handleClickButtonReport = async (name: string) => {
    const cycle = getFromStorage('selected-cycle');

    if (!cycle) {
      toast.error("Selecione um ciclo para ver os pedidos!");
      return;
    }

    const { id } = cycle

    if (name === "list-bags") {
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/bags/report/${id}`,
        {
          responseType: 'arraybuffer',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/pdf'
          }
        })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `relatorio-de-entrega-${generateCurrentTime()}.pdf`);
          document.body.appendChild(link);
          link.click();
        })
        .catch(() => {
          toast.error("Erro desconhecido.")
        });
    }
  };

  return (
    <div className="w-full h-full p-5 pb-6 flex items-center flex-col overflow-y-auto">
      <div className="flex flex-col h-1/5 w-full items-center justify-end mb-10">
        <h1 className="text-3xl font-medium text-slate-gray mb-6 text-center">Relatórios</h1>
        <span className="w-64 text-sm font-medium text-slate-gray text-center">
          Informe o período e o tipo de relatório que deseja gerar
        </span>
      </div>
      <div className="w-full h-4/5 overflow-y-auto">
        <div className='flex space-x-3 mb-3'>
          <DateInput
            label="Data inicial"
            value={initialDate}
            onChange={setInitialDate}
            disabled={true}
          />
          <DateInput
            label="Data final"
            value={finalDate}
            onChange={setFinalDate}
            disabled={true}
          />
        </div>
        <div>
          <ButtonV2
            variant="default"
            onClick={() => handleClickButtonReport("list-offers")}
            disabled
          >
            Lista de ofertas
          </ButtonV2>
          <ButtonV2
            variant="default"
            onClick={() => handleClickButtonReport("list-bags")}
          >
            Lista de sacolas
          </ButtonV2>
          <ButtonV2
            variant="default"
            onClick={() => handleClickButtonReport("cash-flow")}
            disabled
          >
            Fluxo de caixa
          </ButtonV2>
        </div>
      </div>
    </div>
  );
}