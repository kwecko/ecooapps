"use client";
import { useState } from "react";

import Button from "@shared/components/Button";
import Input from "@shared/components/Input";
import { LuChevronLeft } from "react-icons/lu";
import { useRouter } from "next/navigation";

interface FormProps {
  goNextClick: () => void;
  goBackClick: () => void;
}

export default function Step2({ goNextClick, goBackClick }: FormProps) {
  const router = useRouter();

  const savedOfferProductsDataString = localStorage.getItem(
    "offer-products-data"
  );
  const savedOfferProductsData = savedOfferProductsDataString
    ? JSON.parse(savedOfferProductsDataString)
    : null;

  const [amount, setAmount] = useState(savedOfferProductsData.price);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value.replace(/[^0-9]/g, ""));

    if (!isNaN(value)) {
      const formattedValue = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value / 100);

      setAmount(formattedValue);
    } else {
      setAmount("");
    }
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount) {
      setError("Você deve preencher o campo acima!");
      return;
    }

    const newOfferProductData = {
      ...(savedOfferProductsData || {}),
      priceString: amount,
    };

    localStorage.setItem(
      "offer-products-data",
      JSON.stringify(newOfferProductData)
    );

    goNextClick();
  };

  const handleCancelButton = () => {
    localStorage.removeItem("offer-product-step");
    localStorage.removeItem("offer-products-data");

    router.push("/");
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="w-full h-1/4 flex flex-col justify-center">
        <span className="text-center font-medium text-3xl text-slate-gray">
          Qual o preço do <br /> produto?
        </span>
        <span className="text-center text-slate-gray text-sm mt-5 font-medium">
          Qual o preço que o produto será <br />
          vendido? Qual a unidade de venda?
        </span>
      </div>
      <div className="w-full h-[70%]">
        <form
          onSubmit={handleSubmit}
          className="w-full h-full flex flex-col gap-3 mt-4 justify-between"
        >
          <div className="w-full flex gap-2 flex-col">
            <div className="w-full flex gap-3">
              <div className="w-full">
                <Input
                  onChange={handleChange}
                  className="text-theme-primary w-full text-sm"
                  type="text"
                  value={amount}
                  label="Preço"
                />
              </div>
            </div>
            {error && (
              <span className="text-red-600 text-sm text-center">{error}</span>
            )}
          </div>
          <div>
            <Button className="w-full px-2 py-3 font-semibold rounded-lg text-white border-0 p-2 bg-theme-default">
              Continuar
            </Button>
          </div>
        </form>
      </div>
      <div className="w-full flex items-center justify-between h-[5%] mt-8">
        <div className="flex">
          <LuChevronLeft className="w-[30px] h-[30px] text-theme-default" />
          <Button
            className="flex items-center gap-2 text-sm font-medium text-[${bgColor}] w-auto"
            onClick={goBackClick}
          >
            Voltar
          </Button>
        </div>
        <Button
          className="px-2 py-3 bg-[#FF7070] rounded-lg text-white font-medium"
          onClick={handleCancelButton}
        >
          Cancelar
        </Button>
      </div>
    </div>
  );
}
