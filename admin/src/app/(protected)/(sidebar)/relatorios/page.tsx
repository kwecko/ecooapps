"use client";

import { useState, useEffect } from "react";

import { useReportGenerator } from "@shared/hooks/useReportGenerator";

import Title from "@admin/app/components/Title";
import SelectInput from "./components/SelectInput";
import DateInput from "@shared/components/DateInput";
import Button from "@shared/components/Button";
import Copyright from "@admin/app/components/Copyright";
import { AdminReportActions } from "@shared/types/report";

export default function page() {
  const { generateAdminReport } = useReportGenerator();

  const reportTypeOptions: {
    value: AdminReportActions;
    label: string;
  }[] = [{ value: "sales", label: "Vendas" }];
  const [reportType, setReportType] = useState<AdminReportActions>(
    reportTypeOptions[0].value
  );

  const [initialDate, setInitialDate] = useState<Date | undefined>(undefined);
  const [finalDate, setFinalDate] = useState<Date | undefined>(undefined);

  const handleChangeInitialDate = (value: Date) => setInitialDate(value);
  const handleChangeFinalDate = (value: Date) => setFinalDate(value);

  const handleGenerateReport = () => {
    const formatDate = (date?: Date) =>
      date
        ? `${date.getDate().toString().padStart(2, "0")}-${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${date.getFullYear()}`
        : undefined;

    const formattedInitialDate = formatDate(initialDate);
    const formattedFinalDate = formatDate(finalDate);

    generateAdminReport(reportType, formattedInitialDate, formattedFinalDate);
  };

  return (
    <div className="flex flex-col w-full gap-6">
      <Title>Emitir relatórios</Title>
      <div className="w-2/5 flex flex-col gap-4">
        <SelectInput
          label="Selecione o tipo de relatório"
          options={reportTypeOptions}
          onChange={(value) => {
            setReportType(value);
          }}
          defaultOption={reportTypeOptions[0]}
        />

        <SelectInput
          label="Configurações adicionais"
          options={reportTypeOptions}
          onChange={() => {}}
          disabled={true}
          defaultOption={{
            value: "No options",
            label: "Sem opções disponíveis",
          }}
        />

        <div className="flex gap-4">
          <DateInput
            label="Data inicial"
            value={initialDate}
            onChange={handleChangeInitialDate}
          />
          <DateInput
            label="Data final"
            value={finalDate}
            onChange={handleChangeFinalDate}
          />
        </div>

        <Button
          className="w-full h-12 mt-4 rounded-md font-inter font-semibold text-white bg-rain-forest"
          onClick={handleGenerateReport}
        >
          Emitir relatório
        </Button>

        <div className="mt-80 mr-25">
          <Copyright type="primary" />
        </div>
      </div>
    </div>
  );
}
