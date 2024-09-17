"use client";

import { OfferProducts } from "@producer/app/_actions/offers/offer-products";
import Button from "@shared/components/Button";
import { useLocalStorage } from "@shared/hooks/useLocalStorage";
import { useHandleError } from "@shared/hooks/useHandleError";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import {
  LuChevronLeft,
  LuX,
} from "react-icons/lu";
import { toast } from "sonner";
import { InputAmount, InputDescription, InputPrice, RenderProducts, ReviewOffer } from "../components";
import pageSettings from "../components/page-settings";
import { PageSettings } from "@shared/interfaces/page-settings";


function addFormStepContent(step: number, pricing?: "UNIT" | "WEIGHT"): PageSettings {
  switch (step) {
    case 1:
      return pageSettings.productSelection;
    case 2:
      if (pricing === "UNIT") {
        return pageSettings.unitAmount;
      } else {
        return pageSettings.weightAmount;
      };
    case 3:
      return pageSettings.price;
    case 4:
      return pageSettings.description;
    case 5:
      return pageSettings.review;
    default:
      return pageSettings.empty;
  }
}

export default function Home() {

  const router = useRouter();
  const { handleError } = useHandleError();

  const LocalStorage = useLocalStorage();

  const cycle = useMemo(() => LocalStorage.getFromStorage("selected-cycle"), []);
  const cycleId = cycle?.id ?? "";

  const [productId, setProductId] = useState<string>("");
  const [productName, setProductName] = useState<string>("");
  const [amount, setAmount] = useState<number>(1);
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [pricing, setPricing] = useState<"WEIGHT" | "UNIT" | undefined>(undefined);


  const [currentStep, setCurrentStep] = useState<number>(1);
  const stepContent = addFormStepContent(currentStep, pricing);

  const minStep = 1;
  const maxStep = 5;

  const handleNextStep = () => {
    if (currentStep < maxStep) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > minStep) {
      setCurrentStep(currentStep - 1);
    } else {
      cancelOffer();
    }
  };

  const cancelOffer = () => {
    setProductId("");
    setProductName("");
    setAmount(0);
    setPrice(0);
    setDescription("");
    setPricing(undefined);
    setCurrentStep(0);
    router.push("/oferta");
  }

  const submitOffer = async () => {
    await OfferProducts({
      cycle_id: cycleId,
      product_id: productId,
      amount: pricing === "UNIT" ? amount : amount * 1000,
      price: price,
      description: description,
    }).then((response) => {
      if (response.message) {
        if (response.message.includes("Oferta") && response.message.includes("já existe")) {
          toast.error(`Oferta para o produto ${productName} já existe. Tente editar a oferta.`);
          router.push("/oferta");
          return;
        }
        toast.error(response.message as string);
        return;
      } else {
        toast.success("Oferta cadastrada com sucesso");
        router.push("/oferta");
      }
    }).catch((error) => {
      toast.error("Erro ao cadastrar a oferta");
    })
  }

  return (
    <div className="flex flex-col h-[100vh] justify-between items-center bg-theme-background text-slate-gray overflow-y-hidden">
      <div className="h-[var(--min-page-height)] flex flex-col items-center px-4 pt-4 ">
        <div className="flex flex-col items-center h-[23%] px-8 w-full justify-between">
          <div className="flex items-center justify-end w-full fixed px-6 pt-1">
            <Button
              title="Cancelar"
              className="flex items-center gap-2 text-sm font-medium text-[#3E5155] w-auto"
              onClick={cancelOffer}
            >
              <LuX className="w-[30px] h-[30px] text-[#3E5155]" />
            </Button>
          </div>
          <span className="pt-12 text-[30px] leading-[34px] text-center font-medium">
            {stepContent.title}
          </span>
          <span className="pt-4 pb-0 max-w-[270px] text-sm font-medium text-center">
            {stepContent.subtitle}
          </span>
        </div>
        <div className="w-full h-[77%] overflow-hidden">
          {currentStep === 1 && <RenderProducts
            handleNextStep={handleNextStep}
            setProductName={setProductName}
            setProductId={setProductId}
            setPricing={setPricing}
          />}
          {currentStep === 2 && <InputAmount
            handleNextStep={handleNextStep}
            pricing={pricing as "UNIT" | "WEIGHT"}
            amount={amount}
            setAmount={setAmount}
          />}
          {currentStep === 3 && <InputPrice
            handleNextStep={handleNextStep}
            price={price}
            setPrice={setPrice}
          />}
          {currentStep === 4 && <InputDescription
            handleNextStep={handleNextStep}
            description={description}
            setDescription={setDescription}
          />}
          {currentStep === 5 && <ReviewOffer
            cycleId={cycleId}
            productId={productId}
            productName={productName}
            amount={amount}
            price={price}
            description={description}
            pricing={pricing}
            submitAction={submitOffer}
          />}
        </div>
      </div>
      <div className="h-[var(--footer-height)] w-full">
        <div className="flex w-full items-center p-5 justify-between
          static bottom-0 h-[var(--footer-height)] bg-theme-background z-50">
          <div className="flex items-center">
            <LuChevronLeft className="w-[30px] h-[30px] text-[#3E5155]" />
            <Button
              className="flex items-center gap-2 text-sm font-medium text-[#3E5155] w-auto"
              onClick={handlePreviousStep}
            >
              Voltar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
