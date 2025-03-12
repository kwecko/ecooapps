"use client";

import Button from "@shared/components/Button";
import Input from "@shared/components/Input";
import { toast } from "sonner";
import { ModelPage } from "@shared/components/ModelPage";
import { formatPrice } from "@shared/utils/format-price";
import { addTaxToPrice } from "@shared/utils/convert-tax";
import pageSettings from "./page-settings";

interface InputPriceProps {
  handleNextStep: () => void;
  price: number;
  expires_at?: Date;
  perishable: boolean;
  setExpiresAt?: (expires_at: Date) => void; 
  setPrice: (price: number) => void;
}

export default function InputPrice({
  handleNextStep,
  price,
  expires_at,
  perishable,
  setExpiresAt,
  setPrice,
}: InputPriceProps) {
  const { title, subtitle } = pageSettings.price;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value.replace(/[^0-9]/g, ""));

    if (!isNaN(value)) {
      const formattedValue = formatPrice(value);

      setPrice(value / 100);
    } else {
      setPrice(0);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!price) {
      toast.error(
        "O preço não pode ser vazio. Por favor, insira um valor válido."
      );
      return;
    }

    handleNextStep();
  };

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
      <div className="w-full h-full flex flex-col items-stretch justify-start pt-5">
        <Input
          onChange={handleChange}
          className="text-theme-primary text-sm"
          type="text"
          value={formatPrice(price)}
          label="Preço"
        />
        <span className="text-xs text-gray-500 pt-1 pl-2">
          Preço + taxa (20%): {formatPrice(addTaxToPrice(price, 0.2))}
        </span>
      </div>
      {perishable && (
        <div className="w-full h-full flex flex-col items-stretch justify-start pt-8">
          <Input
            onChange={(e) => {
              if (setExpiresAt && e.target.valueAsDate) {
                const date = e.target.valueAsDate;
                date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

                if (date < new Date()) {
                  toast.error("A data não pode estar no passado. Por favor, insira uma data válida.");
                  return;
                }
              setExpiresAt(date);
              }
            }}
            className="text-theme-primary text-sm"
            type="date"
            value={expires_at}
            label="Data de validade"
          />
          <span className="text-xs text-gray-500 pt-1 pl-2">
            Data de validade para produtos perecíveis
          </span>
        </div>
      )}
    </ModelPage>
  );
}
