"use client"

import { toast } from "sonner";
import { useTransition } from "react";

import Loader from "@shared/components/Loader";
import ButtonV2 from "@shared/components/ButtonV2";
import DateInput from '@shared/components/DateInput';
import { ModelPage } from "@shared/components/ModelPage";
import { useLocalStorage } from "@shared/hooks/useLocalStorage";
import { useReportGenerator } from "@shared/hooks/useReportGenerator"; 
import { ReportActions, ReportButtonData } from "@shared/types/report";

export default function Home({ reportData }: { reportData: ReportButtonData }) {
  const [isPending, startTransition] = useTransition();

  const { getFromStorage } = useLocalStorage();
  const { generateReport } = useReportGenerator();

  const handleClickButtonReport = async (name: ReportActions) => {
    startTransition(async () => {
      const cycle = getFromStorage('selected-cycle');
  
      if (!cycle) {
        toast.error("Selecione um ciclo para ver os pedidos!");
        return;
      }
  
      const { id } = cycle;
  
      generateReport(name, id);
    });
  };

  return (
    <ModelPage
      title="Relatórios"
      titleGap="gap-2"
      subtitle="Informe o período e o tipo de relatório que deseja gerar"
      subtitleClassName="w-80"
      overflowAuto={true}
    >
      <div className="w-full h-full flex flex-col mb-4">
        <div className='flex space-x-3 mb-3 mt-8'>
          <DateInput
            label="Data inicial"
            disabled={true}
          />
          <DateInput
            label="Data final"
            disabled={true}
          />
        </div>
        <div className="w-full h-full flex flex-col justify-between mb-2">
          <div className="w-full flex flex-col">
            {reportData.map((data) => {
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

          {isPending && <Loader loaderType="component" />}

        </div>
      </div>
    </ModelPage>
  );
}