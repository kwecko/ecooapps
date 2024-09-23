"use client";
import { useState } from "react";

import Button from "@shared/components/Button";
import Input from "@shared/components/Input";
import { LuChevronLeft } from "react-icons/lu";
import { toast } from "sonner";
import { ModelPage } from "@shared/components/ModelPage";

import pageSettings from "./page-settings";

interface InputPriceProps {
  handleNextStep: () => void;
  price: number;
  setPrice: (price: number) => void;
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price / 100);
}

export default function InputPrice({
  handleNextStep,
  price,
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
          value={formatPrice(price * 100)}
          label="Preço"
        />
        <span className="text-xs text-gray-500 pt-1 pl-2">
          Preço + taxa: {formatPrice(price * 100 + price * 100 * 0.2)}
        </span>
      </div>
    </ModelPage>
  );
}
