"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LuChevronLeft, LuX } from "react-icons/lu";
import { toast } from "sonner";

import { updateOffer } from "@producer/_actions/offers/PATCH/update-offer";
import { convertOfferAmount } from "@shared/utils/convert-unit";
import { useHandleError } from "@shared/hooks/useHandleError";

import Button from "@shared/components/Button";
import Loader from "@shared/components/Loader";
import { OfferDTO } from "@shared/interfaces/dtos";
import {
  InputAmount,
  InputExpirationDate,
  InputPrice,
  InputDescription,
  ReviewOffer,
} from "../components";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [offer, setOffer] = useState<OfferDTO>({} as OfferDTO);
  const [currentStep, setCurrentStep] = useState<number>(1);

  const router = useRouter();
  const { handleError } = useHandleError();

  const minStep: number = 1;
  const maxStep: number = 5;

  useEffect(() => {
    setIsLoading(true);
    const storedOfferData = sessionStorage.getItem("edit-offer-data");
    if (storedOfferData) {
      const offerData: OfferDTO = JSON.parse(storedOfferData);
      setOffer({
        ...offerData,
        amount: convertOfferAmount(offerData.amount, offerData.product.pricing),
        price: offerData.price,
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

  const formatDate = (date: Date | undefined): string | undefined => {
    if (!date) return undefined;
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) return undefined;
    return parsedDate.toISOString();
  };

  const onUpdateOffer = async () => {
    try {
      const response = await updateOffer({
        offer_id: offer.id,
        data: {
          amount:
            offer.product.pricing === "UNIT"
              ? offer.amount
              : offer.amount * 1000,
          price: offer.price,
          description: offer.description ?? undefined,
          expires_at: formatDate(offer.expires_at)
        },
      });
      if (response.message) {
        handleError(response.message as string);
        return;
      }
    } catch (error) {
      handleError(error as string);
      return;
    }

    toast.success("Oferta atualizada com sucesso!");
    router.push("/oferta");
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
            {currentStep === 2 && offer.product.perishable === false && (
              <InputExpirationDate
                handleNextStep={handleNextStep}
                expires_at={offer.expires_at ?? undefined}
                setExpiresAt={(expires_at: Date) =>
                  setOffer({ ...offer, expires_at: expires_at })
                }
              />
            )}
            {(currentStep === 2 && offer.product.perishable === true) ||
            (currentStep === 3 && offer.product.perishable === false) ? (
              <InputPrice
                handleNextStep={handleNextStep}
                price={offer.price ?? 0}
                pricing={offer.product.pricing}
                setPrice={(price) => setOffer({ ...offer, price: price })}
              />
            ) : null}
            {(currentStep === 3 && offer.product.perishable === true) ||
            (currentStep === 4 && offer.product.perishable === false) ? (
              <InputDescription
                handleNextStep={handleNextStep}
                description={offer.description ?? ""}
                setDescription={(description) =>
                  setOffer({ ...offer, description: description })
                }
              />
            ) : null}
            {(currentStep === 4 && offer.product.perishable === true) ||
            (currentStep === 5 && offer.product.perishable === false) ? (
              <ReviewOffer
                productId={offer.product.id ?? ""}
                productName={offer.product.name ?? ""}
                amount={offer.amount ?? 0}
                price={offer.price ?? 0}
                description={offer.description ?? ""}
                pricing={offer.product.pricing ?? "UNIT"}
                expires_at={offer.product.perishable ? undefined : offer.expires_at}
                submitAction={onUpdateOffer}
              />
            ) : null}
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
