"use client";

import { useState } from "react";
import DateInput from '@cdd/components/DateInput';
import ButtonV2 from "@shared/components/ButtonV2";
import { useLocalStorage } from "@shared/hooks/useLocalStorage";
import { ListBagsReport } from "@cdd/app/_actions/report/list-bags-report";
import { useHandleError } from "@shared/hooks/useHandleError";
import { toast } from "sonner";

export default function Home() {
  const [initialDate, setInitialDate] = useState('');
  const [finalDate, setFinalDate] = useState('');

  const { getFromStorage } = useLocalStorage();
  const { handleError } = useHandleError();

  const handleClickButtonReport = async (name: string) => {
    const cycle = getFromStorage('selected-cycle');
    const { id } = cycle;

    if (name === "list-bags") {
      try {
        const response = await ListBagsReport(id);
        
        if (response.message) {
          const messageError = response.message as string;
          console.log(messageError);
          handleError(messageError);
        } else if (response.data) {
          console.log(response.data);
          const pdfBlob = new Blob([response.data], { type: "application/pdf" });

          const pdfBlobUrl = URL.createObjectURL(pdfBlob);
          window.open(pdfBlobUrl);

          const downloadLink = document.createElement('a');
          downloadLink.href = pdfBlobUrl;
          downloadLink.download = 'relatorio_sacolas.pdf';
          downloadLink.click();

          URL.revokeObjectURL(pdfBlobUrl);
        }
      } catch (error) {
        toast.error('Erro ao gerar o relatório');
        console.error(error);
      }
    } else {
      console.log("Relatório não implementado");
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
          />
          <DateInput
            label="Data final"
            value={finalDate}
            onChange={setFinalDate}
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
