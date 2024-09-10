"use client";
import { useState } from "react";

import Button from "@shared/components/Button";
import Input from "@shared/components/Input";
import { LuChevronLeft } from "react-icons/lu";
import { useRouter } from "next/navigation";

interface FormProps {
  goNextClick: () => void;
}

export default function Step1Quantity({ goNextClick }: FormProps) {
  const router = useRouter();

  const savedOfferProductsDataString = localStorage.getItem(
    "offer-products-data"
  );
  const savedOfferProductsData = savedOfferProductsDataString
    ? JSON.parse(savedOfferProductsDataString)
    : null;

  const [quantity, setquantity] = useState(savedOfferProductsData.quantity);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || parseInt(value) >= 1) {
      setquantity(value);
      setError("");
    } else {
      setError("A quantidade mínima permitida é 1.");
    }
  };

  const handleBackClick = () => {
    const newOfferProductData = {
      ...(savedOfferProductsData || {}),
      weigth: "",
      quantity: "",
      price: "",
      describe: "",
    };

    localStorage.setItem(
      "offer-products-data",
      JSON.stringify(newOfferProductData)
    );

    router.push("/produtos/vender");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!quantity) {
      setError("Você deve preencher os campos acima!");
      return;
    }

    const newOfferProductData = {
      ...(savedOfferProductsData || {}),
      quantity: quantity,
      weight: "",
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
          Quantas <br /> unidades?
        </span>
        <span className="text-center text-slate-gray text-sm mt-5 font-medium">
          Quantas unidade do produto que <br />
          gostaria de colocar a venda no nosso <br /> centro de distribuição?
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
                  type="number"
                  value={quantity}
                  label="Unidades"
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
            onClick={handleBackClick}
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
