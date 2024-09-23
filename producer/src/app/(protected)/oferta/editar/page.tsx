"use client";

import Button from "@shared/components/Button";
import { OfferWithProductDTO } from "@shared/domain/dtos/offer-with-product-dto";
import { useLocalStorage } from "@shared/hooks/useLocalStorage";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { LuChevronLeft, LuX } from "react-icons/lu";
import { InputAmount, InputPrice, ReviewOffer } from "../components";

import { UpdateOffer } from "@producer/app/_actions/offers/update-offer";
import { toast } from "sonner";


export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const storedOfferData = sessionStorage.getItem("edit-offer-data");
    if (storedOfferData) {
      const offerData: OfferWithProductDTO = JSON.parse(storedOfferData);

      setOfferId(offerData.id);
      setProductId(offerData.product_id);
      setProductName(offerData.product.name);
      setAmount(
        offerData.product.pricing === "UNIT"
          ? offerData.amount
          : offerData.amount / 1000
      );
      setPrice((offerData.price * 10) / 12);
      setDescription(offerData.description ? offerData.description : "");
      setPricing(offerData.product.pricing);
      setCurrentStep(1);
      sessionStorage.removeItem("edit-offer-data");
    } else {
      toast.error(
        "Nenhuma oferta selecionada para edição. Selecione uma oferta para editar."
      );
      router.push("/oferta");
    }
  }, []);

  const LocalStorage = useLocalStorage();

  const cycle = useMemo(
    () => LocalStorage.getFromStorage("selected-cycle"),
    []
  );
  const cycleId = cycle?.id ?? "";

  const [offerId, setOfferId] = useState<string>("");
  const [productId, setProductId] = useState<string>("");
  const [productName, setProductName] = useState<string>("");
  const [amount, setAmount] = useState<number>(1);
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>("");

  const [pricing, setPricing] = useState<"WEIGHT" | "UNIT" | undefined>(
    undefined
  );

  const [currentStep, setCurrentStep] = useState<number>(1);

  const minStep = 1;
  const maxStep = 3;

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
  };

  const updateOffer = async () => {
    await UpdateOffer({
      offer_id: offerId,
      amount: pricing === "UNIT" ? amount : amount * 1000,
      price: price,
    }).then(() => {
      toast.success("Oferta atualizada com sucesso!");
      router.push("/oferta");
    });
  };

  return (
    <>
      <div className="h-[var(--min-page-height)] w-full">
        <div className="flex items-center justify-end w-full fixed px-6 pt-5">
          <Button
            title="Cancelar"
            className="flex items-center gap-2 text-sm font-medium text-[#3E5155] w-auto"
            onClick={cancelOffer}
          >
            <LuX className="w-[30px] h-[30px] text-[#3E5155]" />
          </Button>
        </div>
        {currentStep === 1 && (
          <InputAmount
            handleNextStep={handleNextStep}
            pricing={pricing as "UNIT" | "WEIGHT"}
            amount={amount}
            setAmount={setAmount}
          />
        )}
        {currentStep === 2 && (
          <InputPrice
            handleNextStep={handleNextStep}
            price={price}
            setPrice={setPrice}
          />
        )}
        {currentStep === 3 && (
          <ReviewOffer
            cycleId={cycleId}
            productId={productId}
            productName={productName}
            amount={amount}
            price={price}
            description={description}
            pricing={pricing}
            submitAction={updateOffer}
          />
        )}
      </div>
      <div className="h-[var(--footer-height)] w-full">
        <div
          className="flex w-full items-center p-5 justify-between
             static bottom-0 h-[var(--footer-height)] bg-theme-background z-50"
        >
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
    </>
  );
}
