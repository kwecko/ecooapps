"use client";

import { useState } from "react";

import Title from "@admin/app/components/Title";
import SelectInput from "./components/SelectInput";
import DateInput from "./components/DateInput";
import Button from "@shared/components/Button";
import Copyright from "@admin/app/components/Copyright";


export default function page() {

  const [reportType, setReportType] = useState<string | undefined>(undefined);
  const reportTypeOptions = [
    { value: "ECONOMY", label: "Fluxo de caixa" },
    { value: "EXPENSES", label: "Despesas" },
  ];

  const [currentStatus, setCurrentStatus] = useState<string | undefined>(
    undefined
  );

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
          defaultOption={{ value: "No options", label: "Sem opções disponíveis" }}
        />

        <div className="flex gap-4">
          <DateInput
            label="Data inicial"
          />
          <DateInput
            label="Data inicial"
          />
        </div>
        
        <Button 
          className="w-full h-12 mt-4 rounded-md font-inter font-semibold text-white bg-rain-forest"
          onChange={() => {}}
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
