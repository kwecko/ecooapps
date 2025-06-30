import { twMerge } from "tailwind-merge";
import { toast } from "sonner";
import { useEffect, useState } from "react";

import Button from "@shared/components/Button";
import SelectInput from "@shared/components/SelectInput";
import { ModelPage } from "@shared/components/ModelPage";

import pageSettings from "./page-settings";

interface InputAmountProps {
  handleNextStep: () => void;
  isRecurrent?: string | null;
  setRecurrence: (recurring: string) => void;
}

function validateValue(value: string) {
  if (value === "" || parseInt(value) <= 0) {
    toast.error("A quantidade mínima permitida é 1.");
    return false;
  }

  return true;
}


export default function InputRecurrence({
  handleNextStep,
  isRecurrent,
  setRecurrence,
}: InputAmountProps) {
  const { title, subtitle } = pageSettings.recurrence;
  const [recurrenceValue, setRecurrenceValue] = useState<string>("false");

  const optionsChange  = [
    { value: "false", label: "Não" },
    { value: "true", label: "Sim" }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateValue(recurrenceValue.toString())) {
      return;
    }

    setRecurrence(recurrenceValue);

    handleNextStep();
  };

  return (
    <ModelPage
      title={title}
      titleGap="gap-5"
      subtitleClassName="px-3"
      subtitle={subtitle}
      buttonArea={
        <Button
          className="w-full h-12 bg-theme-default rounded-md text-white font-semibold text-base leading-5.5"
          type="submit"
          onClick={handleSubmit}
          title="Continuar"
        >
          Continuar
        </Button>
      }
    >
      <div
        className={twMerge(
          "w-full h-full flex flex-col items-stretch justify-between pt-8.5"
        )}
      >
        <div className="flex flex-row gap-2 items-end w-full">
          <div className="flex-grow">
            <SelectInput
              defaultOption={optionsChange.find((option) => 
                option.value === recurrenceValue)}
              onChange={(value) => {
                setRecurrenceValue(value);
              }}
              label={'Oferta recorrente?'}
              options={optionsChange}
            />
          </div>
        </div>
      </div>
    </ModelPage>
  );
}
