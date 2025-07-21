import { twMerge } from "tailwind-merge";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import React from "react";

import Button from "@shared/components/Button";
import SelectInput from "@shared/components/SelectInput";
import { ModelPage } from "@shared/components/ModelPage";
import InfoModal from "@shared/components/InfoModal";

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

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const optionsChange  = [
    { value: "false", label: "Não" },
    { value: "true", label: "Sim" }
  ]

  useEffect(() => {
    if (isRecurrent) {
      setRecurrenceValue(isRecurrent);
    }
  }, [isRecurrent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateValue(recurrenceValue.toString())) {
      return;
    }

    setRecurrence(recurrenceValue);

    handleNextStep();
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  }

  return (
    <ModelPage
      title={title}
      titleGap="gap-5 pr-4 pl-6"
      subtitleClassName="px-3"
      subtitle={subtitle}
      buttonArea={
        <Button
          className="w-full h-12 bg-theme-default rounded-md text-white font-semibold text-base leading-5.5"
          type="submit"
          onClick={handleOpenModal}
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
      <InfoModal
        titleContentModal="Atenção!"
        contentModal={
          <div className="text-center font-inter font-light text-slate-gray text-sm flex flex-col gap-7 p-5">
            <div>
              Ao ativar a oferta recorrente, esta se repetirá automaticamente em todos os ciclos seguintes, mantendo as mesmas informações de quantidade, preço e descrição da oferta original.
            </div>
            <div>
              Para cancelar a sua oferta recorrente, exclua ela da sua lista de ofertas.
            </div>
          </div>
        }
        icon="!"
        titleCloseModal="Ok, entendi"
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        buttonRequest={
          <button
            type="button"
            className="w-full text-white justify-center rounded-md border border-transparent bg-rain-forest px-3 py-4 font-semibold h-12 flex items-center font-inter text-base leading-5.5 tracking-tight-2"
            onClick={handleSubmit}
          >
            Ok, entendi
          </button>
        }
        window_size="max-w-sm"
        text_align="text-center"
        text_size="text-lg font-inter font-light text-slate-gray"
      />
    </ModelPage>
  );
}
