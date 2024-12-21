import Input from "@shared/components/Input";
import { toast } from "sonner";
import Button from "@shared/components/Button";
import { ModelPage } from "@shared/components/ModelPage";
import { convertUnitToLabel } from "@shared/utils/convert-unit";
import { isInteger } from "@shared/utils/validate-value";

import pageSettings from "./page-settings";
import { twMerge } from "tailwind-merge";

interface InputAmountProps {
  handleNextStep: () => void;
  amount: number;
  pricing: "UNIT" | "WEIGHT";
  setAmount: (amount: number) => void;
}

function validateValue(value: string) {
  if (!(value === "" || parseInt(value) >= 0)) {
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

    setAmount(parseInt(value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateValue(amount.toString())) {
      return;
    }

    if (!amount) {
      toast.error("A quantidade mínima permitida é 1.");
      return;
    }

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
          "w-full h-full flex flex-col items-stretch justify-between",
          pricing === "WEIGHT" ? "pt-8.5" : ""
        )}
      >
        <Input
          placeholder="Peso em quilogramas..."
          onChange={handleChange}
          className="text-theme-primary w-full text-sm"
          type="number"
          value={amount.toString()}
          minLength={1}
          step={1}
          label={convertUnitToLabel(pricing)}
          inputMode="numeric"
          pattern="[0-9]*"
          required={true}
        />
      </div>
    </ModelPage>
  );
}
