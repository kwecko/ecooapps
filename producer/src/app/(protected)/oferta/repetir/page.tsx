"use client";

import Button from "@shared/components/Button";
import { OfferWithProductDTO } from "@shared/domain/dtos/offer-with-product-dto";
import { useLocalStorage } from "@shared/hooks/useLocalStorage";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { LuChevronLeft, LuX } from "react-icons/lu";
import {
  InputAmount,
  InputPrice,
  InputDescription,
  ReviewOffer,
} from "../components";
import { convertOfferAmount } from "@shared/utils/convert-unit";
import { removeTaxFromPrice } from "@shared/utils/convert-tax";

import { OfferProducts } from "@producer/app/_actions/offers/offer-products";
import { toast } from "sonner";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const storedOfferData = sessionStorage.getItem("edit-offer-data");
    if (storedOfferData) {
      const offerData: OfferWithProductDTO = JSON.parse(storedOfferData);

      setOfferId(offerData.id);
      setProductId(offerData.product.id);
      setProductName(offerData.product.name);
      setAmount(
        convertOfferAmount(offerData.amount, offerData.product.pricing)
      );
      setPrice(removeTaxFromPrice(offerData.price, 0.2));
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
  const maxStep = 4;

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

  const submitOffer = async () => {
    await OfferProducts({
      cycle_id: cycleId,
      product_id: productId,
      amount: pricing === "UNIT" ? amount : amount * 1000,
      price: price,
      description: description,
    })
      .then((response) => {
        console.log(cycleId, productId, amount, price, description);
        if (response.message) {
          if (
            response.message.includes("Oferta") &&
            response.message.includes("já existe")
          ) {
            toast.error(
              `Oferta para o produto ${productName} já existe. Tente editar a oferta.`
            );
            router.push("/oferta");
            return;
          }
          toast.error(response.message as string);
          return;
        } else {
          toast.success("Oferta cadastrada com sucesso");
          router.push("/oferta");
        }
      })
      .catch((error) => {
        toast.error("Erro ao cadastrar a oferta");
      });
  };

  return (
    <>
      <div className="h-footered-page w-full">
        <div className="flex flex-col items-end justify-center absolute px-6 pt-5 w-inherit">
          <Button
            title="Cancelar"
            className="flex items-center gap-2 text-sm font-medium text-theme-default w-7.5 h-7.5"
            onClick={cancelOffer}
          >
            <LuX className="w-7.5 h-7.5 text-theme-default" />
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
          <InputDescription
            handleNextStep={handleNextStep}
            description={description}
            setDescription={setDescription}
          />
        )}
        {currentStep === 4 && (
          <ReviewOffer
            cycleId={cycleId}
            productId={productId}
            productName={productName}
            amount={amount}
            price={price}
            description={description}
            pricing={pricing}
            submitAction={submitOffer}
          />
        )}
      </div>
      <div className="h-footer w-full">
        <div
          className="flex w-full items-center p-5 justify-between
             static bottom-0 h-footer bg-theme-background z-50"
        >
          <div className="flex items-center">
            <LuChevronLeft className="w-7.5 h-7.5 text-theme-default" />
            <Button
              className="flex items-center gap-2 text-sm font-medium text-theme-default w-auto"
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
