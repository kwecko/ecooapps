"use client";

import { OfferProducts } from "@producer/_actions/offers/POST/offer-products";
import Button from "@shared/components/Button";
import { useHandleError } from "@shared/hooks/useHandleError";
import { useLocalStorage } from "@shared/hooks/useLocalStorage";
import { OfferDTO, ProductDTO } from "@shared/interfaces/dtos";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { LuChevronLeft, LuX } from "react-icons/lu";
import { toast } from "sonner";
import {
  InputAmount,
  InputDescription,
  InputPrice,
  RenderProducts,
  ReviewOffer,
} from "../components";

export default function Home() {
  const router = useRouter();
  const { handleError } = useHandleError();

  const LocalStorage = useLocalStorage();

  const cycle = useMemo(
    () => LocalStorage.getFromStorage("selected-cycle"),
    []
  );
  const cycleId = cycle?.id ?? "";

  const [offer, setOffer] = useState<OfferDTO>({} as OfferDTO);

  const [currentStep, setCurrentStep] = useState<number>(1);

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
    setOffer({} as OfferDTO);
    setCurrentStep(0);
    router.push("/oferta");
  };

  const submitOffer = async () => {
    await OfferProducts({
      cycle_id: cycleId,
      product_id: offer.product.id,
      amount:
        offer.product.pricing === "UNIT" ? offer.amount : offer.amount * 1000,
      price: offer.price,
      description: offer.description ?? undefined,
    })
      .then((response) => {
        if (response.message) {
          if (
            response.message.includes("Oferta") &&
            response.message.includes("já existe")
          ) {
            toast.error(
              `Oferta para o produto ${offer.product.name} já existe. Tente editar a oferta.`
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
        {currentStep === 3 && (
          <InputPrice
            handleNextStep={handleNextStep}
            price={offer.price ?? 0}
            setPrice={(price) => setOffer({ ...offer, price: price })}
          />
        )}
        {currentStep === 4 && (
          <InputDescription
            handleNextStep={handleNextStep}
            description={offer.description ?? ""}
            setDescription={(description) =>
              setOffer({ ...offer, description: description })
            }
          />
        )}
        {currentStep === 5 && (
          <ReviewOffer
            cycleId={cycleId ?? ""}
            productId={offer.product.id ?? ""}
            productName={offer.product.name ?? ""}
            amount={offer.amount ?? 0}
            price={offer.price ?? 0}
            description={offer.description ?? ""}
            pricing={offer.product.pricing ?? "UNIT"}
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
