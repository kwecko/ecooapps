"use client";

import { toast } from "sonner";
import { useTransition, useState } from "react";

import Loader from "@shared/components/Loader";
import ButtonV2 from "@shared/components/ButtonV2";
import DateInput from "@shared/components/DateInput";
import { ModelPage } from "@shared/components/ModelPage";
import { useLocalStorage } from "@shared/hooks/useLocalStorage";
import { useReportGenerator } from "@shared/hooks/useReportGenerator";
import { ReportActions, ReportButtonData } from "@shared/types/report";
import { HiOutlineInformationCircle } from "react-icons/hi";

export default function Home({ reportData }: { reportData: ReportButtonData }) {
  const [isPending, startTransition] = useTransition();
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const handleChangeInitialDate = (value: Date) => setStartDate(value);
  const handleChangeFinalDate = (value: Date) => setEndDate(value);

  const { getFromStorage } = useLocalStorage();
  const { generateReport } = useReportGenerator();

  const handleClickButtonReport = async (name: ReportActions) => {
    startTransition(async () => {
      const cycle = getFromStorage("selected-cycle");

      if (!cycle) {
        toast.error("Selecione um ciclo para ver os pedidos!");
        return;
      }

      const { id } = cycle;

      const formatDate = (date?: Date) =>
        date
          ? `${date.getDate().toString().padStart(2, "0")}-${(date.getMonth() + 1)
              .toString()
              .padStart(2, "0")}-${date.getFullYear()}`
          : undefined;
  
      const formattedInitialDate = formatDate(startDate);
      const formattedFinalDate = formatDate(endDate);
          
      generateReport(name, id, formattedInitialDate, formattedFinalDate);
    });
  };

  return (
    <ModelPage
      title="Relatórios"
      titleGap="gap-4"
      subtitle="Informe o período e o tipo de relatório que deseja gerar"
      subtitleClassName="w-80"
      overflowAuto={true}
    >
      <div className="w-full h-full flex flex-col">
        <div className="flex flex-col mb-3 mt-8 gap-6">
        <DateInput
          label="Data inicial"
          value={startDate}
          onChange={handleChangeInitialDate}
        />
        <DateInput
          label="Data final"
          value={endDate}
          onChange={handleChangeFinalDate}
        />
        </div>

        <div className="w-full h-full flex flex-col justify-between mb-2 mt-8">
          <div className="w-full flex flex-col gap-2.5 pb-4">
            {reportData.map((data) => (
              <div
                key={data.name}
                className="w-full h-full flex items-center p-4 pr-6 rounded-2xl bg-white gap-7"
              >
                <ButtonV2
                  variant="default"
                  onClick={() => handleClickButtonReport(data.onClick)}
                  disabled={data.disabled}
                  className="mt-0"
                >
                  {data.name}
                </ButtonV2>
                <div className="w-[10%] h-full flex justify-center items-center">
                  <HiOutlineInformationCircle size={24} className="text-theme-primary" />
                </div>
              </div>
            ))}
          </div>

          {isPending && <Loader loaderType="component" />}
        </div>
      </div>
    </ModelPage>
  );
}