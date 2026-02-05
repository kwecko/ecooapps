"use client";

import { useState, useEffect } from "react";

import { useReportGenerator } from "@shared/hooks/useReportGenerator";
import useListCycles from "@shared/hooks/cycles/useListCycles";
import useListMarkets from "@admin/hooks/useListMarkets";

import Title from "@admin/app/components/Title";
import SelectInput from "./components/SelectInput";
import DateInput from "@shared/components/DateInput";
import Button from "@shared/components/Button";
import Copyright from "@admin/app/components/Copyright";
import { AdminReportActions, AdminReportConfigType } from "@shared/types/report";

export default function page() {
  const { generateAdminReport } = useReportGenerator();
  const { data: cycles, listCycles } = useListCycles();
  const { data: markets } = useListMarkets({ page: 1 });

  const reportTypeOptions: {
    value: AdminReportActions;
    label: string;
  }[] = [{ value: "sales", label: "Vendas" }];
  const [reportType, setReportType] = useState<AdminReportActions>(
    reportTypeOptions[0].value
  );

  const configTypeOptions: {
    value: AdminReportConfigType;
    label: string;
  }[] = [
    { value: "cycle", label: "Ciclo" },
    { value: "market", label: "Feira do dia" },
  ];
  const [configType, setConfigType] = useState<AdminReportConfigType | undefined>(undefined);

  const [selectedCycleId, setSelectedCycleId] = useState<string | undefined>(undefined);
  const [selectedMarketId, setSelectedMarketId] = useState<string | undefined>(undefined);

  const [initialDate, setInitialDate] = useState<Date | undefined>(undefined);
  const [finalDate, setFinalDate] = useState<Date | undefined>(undefined);

  const handleChangeInitialDate = (value: Date) => setInitialDate(value);
  const handleChangeFinalDate = (value: Date) => setFinalDate(value);

  useEffect(() => {
    if (configType === "cycle") {
      listCycles();
      setSelectedMarketId(undefined);
    } else if (configType === "market") {
      setSelectedCycleId(undefined);
    }
  }, [configType]);

  const handleGenerateReport = () => {
    const formatDate = (date?: Date) =>
      date
        ? `${(date.getDate() + 1).toString().padStart(2, "0")}-${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${date.getFullYear()}`
        : undefined;

    const formattedInitialDate = formatDate(initialDate);
    const formattedFinalDate = formatDate(finalDate);

    generateAdminReport(
      reportType,
      formattedInitialDate,
      formattedFinalDate,
      selectedCycleId,
      selectedMarketId
    );
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
          options={configTypeOptions}
          onChange={(value) => {
            setConfigType(value as AdminReportConfigType);
          }}
          defaultOption={{
            value: "",
            label: "Selecione uma opção",
          }}
        />

        {configType === "cycle" && (
          <SelectInput
            label="Selecione o ciclo"
            options={cycles.map((cycle) => ({
              value: cycle.id,
              label: cycle.alias,
            }))}
            onChange={(value) => {
              setSelectedCycleId(value);
            }}
            defaultOption={{
              value: "",
              label: "Selecione um ciclo",
            }}
          />
        )}

        {configType === "market" && (
          <SelectInput
            label="Selecione a feira do dia"
            options={markets.map((market) => ({
              value: market.id,
              label: market.name,
            }))}
            onChange={(value) => {
              setSelectedMarketId(value);
            }}
            defaultOption={{
              value: "",
              label: "Selecione uma feira",
            }}
          />
        )}

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

        <div className="mt-80 mr-auto">
          <Copyright type="primary" />
        </div>
      </div>
    </div>
  );
}
