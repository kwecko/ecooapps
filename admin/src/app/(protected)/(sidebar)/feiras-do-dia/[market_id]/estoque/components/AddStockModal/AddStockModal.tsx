"use client";

import { useEffect } from "react";

import Loader from "@shared/components/Loader";
import ModalV2 from "@shared/components/ModalV2";
import ButtonV2 from "@shared/components/ButtonV2";
import SearchableSelect from "../SearchableSelect";
import { addTaxToPrice } from "@shared/utils/convert-tax";
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

  useEffect(() => {
    if (selectedProduct?.value) {
      const product = getProductData(selectedProduct.value);
      setSelectedProductData(product);
    } else {
      setSelectedProductData(null);
    }
  }, [selectedProduct, getProductData, setSelectedProductData]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatDateForInput = (dateString: string) => {
    if (!dateString) return "";
    const parts = dateString.split("/");
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return dateString;
  };

  return (
    <ModalV2
      isOpen={isOpen}
      closeModal={closeModal}
      className="w-152 bg-white text-coal-black"
      title="Adicionar ao estoque"
      iconClose={true}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
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
            rows={3}
          />
          {errors.comment && (
            <p className="text-red-500 text-sm mt-1">{errors.comment.message}</p>
          )}
        </div>

        <div>
          <div className="flex flex-row gap-2 items-end w-full">
            <div className="flex-grow">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantidade?
              </label>
              <input
                type="number"
                {...register("amount", { valueAsNumber: true })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme-highlight focus:border-transparent"
                min={1}
                placeholder="0"
              />
              {errors.amount && (
                <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
              )}
            </div>
            <div className="w-32">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Unidade
              </label>
              <input
                type="text"
                value={selectedProductData?.pricing === "WEIGHT" ? "kg" : "unidade"}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 cursor-not-allowed text-center"
              />
            </div>
          </div>
        </div>

        {selectedProductData && !selectedProductData.perishable && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Validade:
            </label>
            <input
              type="date"
              {...register("expires_at")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme-highlight focus:border-transparent"
            />
            {errors.expires_at && (
              <p className="text-red-500 text-sm mt-1">{errors.expires_at.message}</p>
            )}
          </div>
        )}

        <div>
          <div className="flex flex-row gap-2 items-end w-full">
            <div className="flex-grow">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preço:
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                  R$
                </span>
                <input
                  type="number"
                  step="0.01"
                  {...register("price", {
                    valueAsNumber: true,
                    onChange: (e) => {
                      const value = parseFloat(e.target.value) || 0;
                      setPrice(value);
                    },
                  })}
                  className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme-highlight focus:border-transparent"
                  placeholder="0,00"
                />
              </div>
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
              )}
            </div>
            <div className="w-32">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Unidade
              </label>
              <input
                type="text"
                value={selectedProductData?.pricing === "WEIGHT" ? "kg" : "unidade"}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 cursor-not-allowed text-center"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preço de venda (inclusa taxa de 20%):
          </label>
          <input
            type="text"
            value={formatCurrency(addTaxToPrice(price, 0.2))}
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 cursor-not-allowed"
          />
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

