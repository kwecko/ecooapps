"use client";

import useCreateOffer from "@producer/hooks/catalogs/useCreateOffer";
import Button from "@shared/components/Button";
import { OfferDTO, ProductDTO } from "@shared/interfaces/dtos";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LuChevronLeft, LuX } from "react-icons/lu";
import { toast } from "sonner";
import {
  InputAmount,
  InputExpirationDate,
  InputPrice,
  InputDescription,
  RenderProducts,
  ReviewOffer,
} from "../components";

export default function Home() {
  const router = useRouter();

  const { createOffer } = useCreateOffer();

  const [offer, setOffer] = useState<OfferDTO>({} as OfferDTO);

  const [currentStep, setCurrentStep] = useState<number>(1);

  const minStep = 1;
  const maxStep = 6;

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

  const submitOffer = async () => {
    const formatDate = (date: Date | undefined): string | undefined => {
      if (!date) return undefined;
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    };

    const success = await createOffer({
      product_id: offer.product.id,
      amount:
        offer.product.pricing === "UNIT" ? offer.amount : offer.amount * 1000,
      price: offer.price,
      description: offer.description ?? undefined,
      expires_at: formatDate(offer.expires_at),
    });
    if (!success) return;
    toast.success("Oferta cadastrada com sucesso");
    router.push("/oferta");
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
          <RenderProducts
            handleNextStep={handleNextStep}
            setProduct={(product: ProductDTO) =>
              setOffer({ ...offer, product: product })
            }
          />
        )}
        {currentStep === 2 && (
          <InputAmount
            handleNextStep={handleNextStep}
            pricing={offer.product.pricing ?? "UNIT"}
            amount={offer.amount ?? 0}
            setAmount={(amount) => setOffer({ ...offer, amount: amount })}
          />
        )}
        {currentStep === 3 && offer.product.perishable === false && (
          <InputExpirationDate
            handleNextStep={handleNextStep}
            expires_at={offer.expires_at}
            setExpiresAt={(expires_at) =>
              setOffer({ ...offer, expires_at: expires_at })
            }
          />
        )}
        {(currentStep === 3 && offer.product.perishable === true) ||
        (currentStep === 4 && offer.product.perishable === false) ? (
          <InputPrice
            handleNextStep={handleNextStep}
            price={offer.price ?? 0}
            pricing={offer.product.pricing}
            setPrice={(price) => setOffer({ ...offer, price: price })}
          />
        ) : null}
        {(currentStep === 4 && offer.product.perishable === true) ||
        (currentStep === 5 && offer.product.perishable === false) ? (
          <InputDescription
            handleNextStep={handleNextStep}
            description={offer.description ?? ""}
            setDescription={(description) =>
              setOffer({ ...offer, description: description })
            }
          />
        ) : null}
        {(currentStep === 5 && offer.product.perishable === true) ||
        (currentStep === 6 && offer.product.perishable === false) ? (
          <ReviewOffer
            productId={offer.product.id ?? ""}
            productName={offer.product.name ?? ""}
            amount={offer.amount ?? 0}
            price={offer.price ?? 0}
            description={offer.description ?? ""}
            pricing={offer.product.pricing ?? "UNIT"}
            expires_at={offer.product.perishable ? undefined : offer.expires_at}
            submitAction={submitOffer}
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
  );
}
