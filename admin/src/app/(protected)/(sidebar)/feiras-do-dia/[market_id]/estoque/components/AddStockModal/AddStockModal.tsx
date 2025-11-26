"use client";

import { useEffect, useState } from "react";
import { IoCalendarOutline } from "react-icons/io5";
import { toast } from "sonner";

import Loader from "@shared/components/Loader";
import ModalV2 from "@shared/components/ModalV2";
import ButtonV2 from "@shared/components/ButtonV2";
import Input from "@shared/components/Input";
import SearchableSelect from "../SearchableSelect";
import { addTaxToPrice } from "@shared/utils/convert-tax";
import { formatPrice } from "@shared/utils/format-price";
import { convertUnitToLabel } from "@shared/utils/convert-unit";
import useAddStockModal from "./index";

interface AddStockModalProps {
  isOpen: boolean;
  closeModal: () => void;
  market_id: string;
  reloadOffers: () => void;
}

export default function AddStockModal({
  isOpen,
  closeModal,
  market_id,
  reloadOffers,
}: AddStockModalProps) {
  const {
    register,
    handleSubmit,
    setValue,
    errors,
    isPending,
    onSubmit,
    selectedProduct,
    setSelectedProduct,
    selectedProductData,
    setSelectedProductData,
    selectedFarm,
    setSelectedFarm,
    searchProducts,
    searchFarms,
    getProductData,
    price,
    setPrice,
  } = useAddStockModal({ market_id, closeModal, reloadOffers });

  const [amountInputValue, setAmountInputValue] = useState<string>("");

  useEffect(() => {
    if (selectedProduct?.value) {
      const product = getProductData(selectedProduct.value);
      setSelectedProductData(product);
    } else {
      setSelectedProductData(null);
    }
  }, [selectedProduct, getProductData, setSelectedProductData]);

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
    const parsed = parseInt(cleaned, 10);

    if (!isNaN(parsed) && parsed > 0) {
      setValue("amount", parsed);
    }
  };

  const handleAmountKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " ") {
      e.preventDefault();
    }
  };

  const unitLabel = selectedProductData?.pricing 
    ? convertUnitToLabel(selectedProductData.pricing)
    : "Quantidade";

  const priceWithTax = addTaxToPrice(price, 0.2);

  return (
    <ModalV2
      isOpen={isOpen}
      closeModal={closeModal}
      className="w-152 bg-white text-coal-black"
      title="Adicionar ao estoque"
      iconClose={true}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 max-h-[calc(95vh-140px)] overflow-y-auto pr-2">
        <SearchableSelect
          label="Qual o produto?"
          placeholder="Digite para buscar o produto..."
          value={selectedProduct}
          onSearch={searchProducts}
          onChange={(option) => {
            setSelectedProduct(option);
            setValue("product_id", option?.value || "");
          }}
          errorMessage={errors.product_id?.message}
        />

        <SearchableSelect
          label="Quem é o produtor?"
          placeholder="Digite para buscar o produtor..."
          value={selectedFarm}
          onSearch={searchFarms}
          onChange={(option) => {
            setSelectedFarm(option);
            setValue("farm_id", option?.value || "");
          }}
          errorMessage={errors.farm_id?.message}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Deixe um comentário (opcional)
          </label>
          <textarea
            {...register("comment")}
            placeholder="Ex: Manter refrigerado."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme-highlight focus:border-transparent resize-none"
            rows={2}
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
              required={true}
              error={errors.amount?.message}
            />
          </div>
          <div className="w-24">
            <Input
              className="text-theme-primary w-full text-sm"
              type="text"
              value={selectedProductData?.pricing === "WEIGHT" ? "kg" : "unidade"}
              label="Unidade"
              disabled={true}
            />
          </div>
        </div>

        {selectedProductData && !selectedProductData.perishable && (
          <div className="w-full flex flex-col items-stretch justify-start">
            <Input
              onChange={(e) => {
                if (e.target.valueAsDate) {
                  const date = e.target.valueAsDate;
                  const adjustedDate = new Date(date);
                  adjustedDate.setMinutes(
                    adjustedDate.getMinutes() + adjustedDate.getTimezoneOffset()
                  );

                  if (adjustedDate < new Date()) {
                    toast.error(
                      "A data não pode estar no passado. Por favor, insira uma data válida."
                    );
                    return;
                  }

                  const day = String(date.getDate()).padStart(2, "0");
                  const month = String(date.getMonth() + 1).padStart(2, "0");
                  const year = date.getFullYear();
                  setValue("expires_at", `${year}-${month}-${day}`);
                }
              }}
              className="text-theme-primary text-sm pl-10"
              type="date"
              label="Data de validade"
              icon={<IoCalendarOutline size={20} />}
              iconPosition="left"
              error={errors.expires_at?.message}
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
              value={selectedProductData?.pricing === "WEIGHT" ? "kg" : "unidade"}
              label="Unidade"
              disabled={true}
            />
          </div>
        </div>
        <Input
          className="text-theme-primary w-full text-sm"
          type="text"
          value={formatPrice(priceWithTax)}
          label="Preço de venda (inclusa taxa de 20%)"
          disabled={true}
        />

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

