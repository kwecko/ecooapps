"use client";

import { toast } from "sonner";
import { useState } from "react";
import DateInput from '@shared/components/DateInput';
import ButtonV2 from "@shared/components/ButtonV2";
import { useLocalStorage } from "@shared/hooks/useLocalStorage";
import { useReportGenerator } from "./hooks/useReportGenerator"; 
import { reportaButtonData } from "./data";

export default function Home() {
  const [initialDate, setInitialDate] = useState('');
  const [finalDate, setFinalDate] = useState('');

  const { getFromStorage } = useLocalStorage();
  const { generateReport } = useReportGenerator()

  const handleClickButtonReport = async (name: string) => {
    const cycle = getFromStorage('selected-cycle');

    if (!cycle) {
      toast.error("Selecione um ciclo para ver os pedidos!");
      return;
    }

    const { id } = cycle;

    generateReport(name, id)
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
          {reportaButtonData.map((data) => {
            return (
              <ButtonV2
                key={data.name}
                variant="default"
                onClick={() => handleClickButtonReport(data.onClick)}
                disabled={data.disabled}
              >
                {data.name}
              </ButtonV2>
            )
          })}
        </div>
      </div>
    </div>
  );
}
