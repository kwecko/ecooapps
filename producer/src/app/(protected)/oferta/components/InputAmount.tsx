import { twMerge } from "tailwind-merge";
import { toast } from "sonner";

import Button from "@shared/components/Button";
import Input from "@shared/components/Input";
import { ModelPage } from "@shared/components/ModelPage";
import { convertUnitToLabel } from "@shared/utils/convert-unit";

import pageSettings from "./page-settings";

interface InputAmountProps {
  handleNextStep: () => void;
  amount: number;
  pricing: "UNIT" | "WEIGHT";
  setAmount: (amount: number) => void;
}

function validateValue(value: string) {
  if (value === "" || parseInt(value) <= 0) {
    toast.error("A quantidade mínima permitida é 1.");
    return false;
  }

  return true;
}

export default function InputAmount({
  handleNextStep,
  amount,
  pricing,
  setAmount,
}: InputAmountProps) {
  const { title, subtitle } =
    pricing === "UNIT" ? pageSettings.unitAmount : pageSettings.weightAmount;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!validateValue(value)) {
      return;
    }

    setAmount(parseInt(value) || 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (amount <= 0) {
      toast.error("A quantidade mínima permitida é 1.");
      return;
    }

    handleNextStep();
  };

  const unitLabel = convertUnitToLabel(pricing);
  const placeholder =
    pricing === "UNIT" ? "Digite a quantidade..." : "Peso em quilogramas...";

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
          "w-full h-full flex flex-col items-stretch justify-between",
          pricing === "WEIGHT" ? "pt-8.5" : ""
        )}
      >
        <div className="flex flex-row gap-2 items-end w-full">
          <div className="flex-grow">
            <Input
              placeholder={placeholder}
              onChange={handleChange}
              className="text-theme-primary w-full text-sm"
              type="number"
              value={amount || ""}
              minLength={1}
              step={1}
              label={unitLabel}
              inputMode="numeric"
              pattern="[0-9]*"
              required={true}
            />
          </div>
          <div className="w-24">
            <Input
              placeholder="Unidade"
              className="text-theme-primary w-full text-sm"
              type="text"
              value={pricing === "WEIGHT" ? "kg" : "unidade"}
              label="Unidade"
              disabled={true}
            />
          </div>
        </div>
      </div>
    </ModelPage>
  );
}
