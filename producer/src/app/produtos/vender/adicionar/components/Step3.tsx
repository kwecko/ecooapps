"use client";
import { useState } from "react";

import Button from "@shared/components/Button";
import { LuChevronLeft } from "react-icons/lu";
import { useRouter } from "next/navigation";

interface FormProps {
  goNextClick: () => void;
  goBackClick: () => void;
}

export default function Step3({ goNextClick, goBackClick }: FormProps) {
  const router = useRouter();

  const savedOfferProductsDataString = localStorage.getItem(
    "offer-products-data"
  );
  const savedOfferProductsData = savedOfferProductsDataString
    ? JSON.parse(savedOfferProductsDataString)
    : null;

  const [describe, setDescribe] = useState(
    savedOfferProductsData?.describe || ""
  );
  const [charCount, setCharCount] = useState(
    savedOfferProductsData?.describe?.length || 0
  );

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescribe(e.target.value);
    setCharCount(e.target.value.length);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newOfferProductData = {
      ...(savedOfferProductsData || {}),
      describe: describe,
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
          Faltou alguma <br /> coisa?
        </span>
        <span className="text-center text-slate-gray text-sm mt-5 font-medium">
          Se existir alguma característica que <br />
          você deseja informar ao consumidor, <br />
          descreva aqui ou deixe em branco
        </span>
      </div>
      <div className="w-full h-[70%]">
        <form
          onSubmit={handleSubmit}
          className="w-full h-full flex flex-col gap-3 mt-4 justify-between"
        >
          <div className="w-full h-full flex flex-col">
            <label className="font-inter text-sm text-theme-primary">
              Descrição
            </label>
            <textarea
              maxLength={200}
              value={describe}
              onChange={handleChange}
              className="text-slate-gray rounded-lg border-theme-primary border-[1px] w-full h-2/5 p-3 resize-none text-sm"
            />
            <p className="text-right text-slate-gray text-xs mt-1">{`${charCount}/200`}</p>
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
