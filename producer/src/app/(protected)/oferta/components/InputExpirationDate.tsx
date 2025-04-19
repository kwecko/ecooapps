"use client";

import Button from "@shared/components/Button";
import Input from "@shared/components/Input";
import { toast } from "sonner";
import { ModelPage } from "@shared/components/ModelPage";
import pageSettings from "./page-settings";
import { format } from "path";

interface InputExpirationDateProps {
  handleNextStep: () => void;
  expires_at?: Date;
  setExpiresAt?: (expires_at: Date) => void;
}

export default function InputExpirationDate({
  handleNextStep,
  expires_at,
  setExpiresAt,
}: InputExpirationDateProps) {
  const { title, subtitle } = pageSettings.expirationDate;

  const validateAndSetExpirationDate = (date: Date | null) => {
    if (!date) return false;

    const adjustedDate = new Date(date);
    adjustedDate.setMinutes(
      adjustedDate.getMinutes() + adjustedDate.getTimezoneOffset()
    );

    if (adjustedDate < new Date()) {
      toast.error(
        "A data não pode estar no passado. Por favor, insira uma data válida."
      );
      return false;
    }

    if (setExpiresAt) {
      setExpiresAt(adjustedDate);
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!expires_at) {
      toast.error(
        "A data de validade não é válida. Por favor, insira uma data válida."
      );
      return;
    }

    handleNextStep();
  };

  const formattedDate = expires_at
    ? new Date(expires_at).toISOString().split("T")[0]
    : "";

  return (
    <ModelPage
      title={title}
      titleGap="gap-5"
      titleClassName="px-3"
      subtitleClassName="px-4"
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
      <div className="w-full h-full flex flex-col items-stretch justify-start pt-8">
        <Input
          onChange={(e) => {
            if (e.target.valueAsDate) {
              validateAndSetExpirationDate(e.target.valueAsDate);
            }
          }}
          className="text-theme-primary text-sm"
          type="date"
          value={formattedDate}
          label="Data de validade"
        />
        <span className="text-xs text-gray-500 pt-1 pl-2">
          Data de validade para produtos perecíveis
        </span>
      </div>
    </ModelPage>
  );
}
