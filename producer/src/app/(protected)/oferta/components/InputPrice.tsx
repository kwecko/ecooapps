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
  pricing: "UNIT" | "WEIGHT";
  setPrice: (price: number) => void;
}

export default function InputPrice({
  handleNextStep,
  price,
  pricing,
  setPrice,
}: InputPriceProps) {
  const { title, subtitle } = pageSettings.price;
  const TAX_RATE = 0.2;

  const processPrice = (inputValue: string): number => {
    const numericValue = parseFloat(inputValue.replace(/[^0-9]/g, ""));
    return !isNaN(numericValue) ? numericValue / 100 : 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = processPrice(e.target.value);
    setPrice(newPrice);
  };

  const validatePrice = (): boolean => {
    if (!price) {
      toast.error(
        "O preço não pode ser vazio. Por favor, insira um valor válido."
      );
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validatePrice()) {
      handleNextStep();
    }
  };

  const priceWithTax = addTaxToPrice(price, TAX_RATE);

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
      <div className="w-full h-full flex flex-col gap-2 items-stretch justify-start pt-5">
        <div className="flex flex-row gap-2 items-end w-full">
          <div className="flex-grow">
            <Input
              onChange={handleChange}
              className="text-theme-primary text-sm"
              type="text"
              value={formatPrice(price)}
              label="Preço"
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
        <Input
          placeholder="R$ 0,00"
          className="text-theme-primary w-full text-sm"
          type="text"
          value={formatPrice(priceWithTax)}
          label="Preço de venda (inclusa taxa de 20%)"
          disabled={true}
        />
      </div>
    </ModelPage>
  );
}
