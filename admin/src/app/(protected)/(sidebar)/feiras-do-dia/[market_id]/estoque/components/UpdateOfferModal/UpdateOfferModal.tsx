"use client";

import { useEffect, useState } from "react";
import { IoCalendarOutline } from "react-icons/io5";
import { toast } from "sonner";

import Loader from "@shared/components/Loader";
import ModalV2 from "@shared/components/ModalV2";
import ButtonV2 from "@shared/components/ButtonV2";
import Input from "@shared/components/Input";
import { addTaxToPrice } from "@shared/utils/convert-tax";
import { formatPrice } from "@shared/utils/format-price";
import { convertUnitToLabel } from "@shared/utils/convert-unit";
import { OfferDTO } from "@shared/interfaces/dtos";
import useUpdateOfferModal from "./index";

interface UpdateOfferModalProps {
  isOpen: boolean;
  closeModal: () => void;
  offer: OfferDTO | null;
  reloadOffers: () => void;
}

export default function UpdateOfferModal({
  isOpen,
  closeModal,
  offer,
  reloadOffers,
}: UpdateOfferModalProps) {
  const {
    register,
    handleSubmit,
    setValue,
    errors,
    isPending,
    onSubmit,
    price,
    setPrice,
  } = useUpdateOfferModal({ offer, closeModal, reloadOffers });

  const [amountInputValue, setAmountInputValue] = useState<string>("");
  const [expiresAtValue, setExpiresAtValue] = useState<string>("");

  useEffect(() => {
    if (offer) {
      const convertedAmount =
        offer.product?.pricing === "UNIT"
          ? offer.amount
          : offer.amount / 1000;
      setAmountInputValue(convertedAmount.toString());

      if (offer.expires_at) {
        const date = new Date(offer.expires_at);
        if (!isNaN(date.getTime())) {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");
          const dateString = `${year}-${month}-${day}`;
          setExpiresAtValue(dateString);
        } else {
          setExpiresAtValue("");
        }
      } else {
        setExpiresAtValue("");
      }
    } else {
      setAmountInputValue("");
      setExpiresAtValue("");
    }
  }, [offer]);

  const processPrice = (inputValue: string): number => {
    const numericValue = parseFloat(inputValue.replace(/[^0-9]/g, ""));
    return !isNaN(numericValue) ? numericValue / 100 : 0;
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = processPrice(e.target.value);
    setPrice(newPrice);
    setValue("price", newPrice);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmountInputValue(value);

    const cleaned = value.replace(/\s+/g, "");
    const parsed = parseFloat(cleaned);

    if (!isNaN(parsed) && parsed > 0) {
      setValue("amount", parsed);
    }
  };

  const handleAmountKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " ") {
      e.preventDefault();
    }
  };

  const unitLabel = offer?.product?.pricing
    ? convertUnitToLabel(offer.product.pricing)
    : "Quantidade";

  const priceWithTax = addTaxToPrice(price, 0.2);

  if (!offer) {
    return null;
  }

  return (
    <ModalV2
      isOpen={isOpen}
      closeModal={closeModal}
      className="w-152 bg-white text-coal-black"
      title="Editar oferta"
      iconClose={true}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 max-h-[calc(95vh-140px)] overflow-y-auto pr-2"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descrição (opcional)
          </label>
          <textarea
            {...register("description")}
            placeholder="Ex: Produto fresco e orgânico."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme-highlight focus:border-transparent resize-none"
            rows={1}
            maxLength={200}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Comentário (opcional)
          </label>
          <textarea
            {...register("comment")}
            placeholder="Ex: Manter refrigerado."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme-highlight focus:border-transparent resize-none"
            rows={1}
            maxLength={200}
          />
          {errors.comment && (
            <p className="text-red-500 text-sm mt-1">{errors.comment.message}</p>
          )}
        </div>

        <div className="flex flex-row gap-2 items-end w-full">
          <div className="flex-grow">
            <Input
              onChange={handleAmountChange}
              onKeyDown={handleAmountKeyDown}
              className="text-theme-primary w-full text-sm"
              type="number"
              value={amountInputValue}
              minLength={1}
              step={1}
              label={unitLabel}
              inputMode="numeric"
              pattern="[0-9]*"
              error={errors.amount?.message}
            />
          </div>
          <div className="w-24">
            <Input
              className="text-theme-primary w-full text-sm"
              type="text"
              value={
                offer.product?.pricing === "WEIGHT" ? "kg" : "unidade"
              }
              label="Unidade"
              disabled={true}
            />
          </div>
        </div>

        {offer.product && !offer.product.perishable && (
          <div className="w-full flex flex-col items-stretch justify-start">
            <Input
              {...register("expires_at")}
              className="text-theme-primary text-sm pl-10"
              type="date"
              label="Data de validade"
              icon={<IoCalendarOutline size={20} />}
              iconPosition="left"
              error={errors.expires_at?.message}
              value={expiresAtValue}
              onChange={(e) => {
                setExpiresAtValue(e.target.value);
                setValue("expires_at", e.target.value);
              }}
            />
            <span className="text-xs text-gray-500 pt-1 pl-2">
              Data de validade para produtos não perecíveis
            </span>
          </div>
        )}

        <div className="flex flex-row gap-2 items-end w-full">
          <div className="flex-grow">
            <Input
              onChange={handlePriceChange}
              className="text-theme-primary text-sm"
              type="text"
              value={formatPrice(price)}
              label="Preço"
              error={errors.price?.message}
            />
          </div>
          <div className="w-24">
            <Input
              className="text-theme-primary w-full text-sm"
              type="text"
              value={offer.product?.pricing === "WEIGHT" ? "kg" : "unidade"}
              label="Unidade"
              disabled={true}
            />
          </div>
          <div className="flex-grow">
            <Input
              className="text-theme-primary w-full text-sm"
              type="text"
              value={formatPrice(priceWithTax)}
              label="Preço (com taxa de 20%)"
              disabled={true}
            />
          </div>
        </div>

        <div className="flex justify-between items-center gap-4">
          <ButtonV2
            variant="default"
            type="button"
            onClick={closeModal}
            className="bg-tertiary text-slate-dark border-none"
          >
            Cancelar
          </ButtonV2>
          <ButtonV2
            variant="default"
            type="submit"
            className="bg-rain-forest border-none"
          >
            {isPending ? <Loader loaderType="login" /> : "Salvar"}
          </ButtonV2>
        </div>
      </form>
    </ModalV2>
  );
}

