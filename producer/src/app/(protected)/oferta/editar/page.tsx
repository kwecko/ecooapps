"use client";

import Button from "@shared/components/Button";
import { useLocalStorage } from "@shared/hooks/useLocalStorage";
import { removeTaxFromPrice } from "@shared/utils/convert-tax";
import { convertOfferAmount } from "@shared/utils/convert-unit";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { LuChevronLeft, LuX } from "react-icons/lu";
import {
  InputAmount,
  InputDescription,
  InputPrice,
  ReviewOffer,
} from "../components";

import { UpdateOffer } from "@producer/_actions/offers/PATCH/update-offer";
import { toast } from "sonner";

import Loader from "@shared/components/Loader";
import { OfferDTO } from "@shared/interfaces/dtos";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  const LocalStorage = useLocalStorage();

  const cycle = useMemo(
    () => LocalStorage.getFromStorage("selected-cycle"),
    []
  );
  const cycleId = cycle?.id ?? "";

  const [offer, setOffer] = useState<OfferDTO>({} as OfferDTO);

  const [currentStep, setCurrentStep] = useState<number>(1);

  const minStep = 1;
  const maxStep = 4;

  useEffect(() => {
    setIsLoading(true);
    const storedOfferData = sessionStorage.getItem("edit-offer-data");
    if (storedOfferData) {
      const offerData: OfferDTO = JSON.parse(storedOfferData);
      setOffer({
        ...offerData,
        amount: convertOfferAmount(offerData.amount, offerData.product.pricing),
        price: removeTaxFromPrice(offerData.price, 0.2),
      });
      setCurrentStep(1);
      sessionStorage.removeItem("edit-offer-data");
      setIsLoading(false);
    } else {
      toast.error(
        "Nenhuma oferta selecionada para edição. Selecione uma oferta para editar."
      );
      router.push("/oferta");
    }
  }, []);

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
    setOffer({} as OfferDTO);
    setCurrentStep(0);
    router.push("/oferta");
  };

  const updateOffer = async () => {
    await UpdateOffer({
      offer_id: offer.id,
      amount:
        offer.product.pricing === "UNIT" ? offer.amount : offer.amount * 1000,
      price: offer.price,
      description: offer.description ?? undefined,
    }).then(() => {
      toast.success("Oferta atualizada com sucesso!");
      router.push("/oferta");
    });
  };

  return (
    <>
      {isLoading ? (
        <div className="h-full w-full flex justify-center items-center">
          <Loader className="h-full" loaderType="page" />
        </div>
      ) : (
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
                pricing={offer.product.pricing}
                amount={offer.amount}
                setAmount={(amount) => setOffer({ ...offer, amount: amount })}
              />
            )}
            {currentStep === 2 && (
              <InputPrice
                handleNextStep={handleNextStep}
                price={offer.price}
                setPrice={(price) => setOffer({ ...offer, price: price })}
              />
            )}
            {currentStep === 3 && (
              <InputDescription
                handleNextStep={handleNextStep}
                description={offer.description ?? ""}
                setDescription={(description) =>
                  setOffer({ ...offer, description: description })
                }
              />
            )}
            {currentStep === 4 && (
              <ReviewOffer
                cycleId={cycleId}
                productId={offer.product.id}
                productName={offer.product.name}
                amount={offer.amount}
                price={offer.price}
                description={offer.description ?? ""}
                pricing={offer.product.pricing}
                submitAction={updateOffer}
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
      )}
    </>
  );
}
