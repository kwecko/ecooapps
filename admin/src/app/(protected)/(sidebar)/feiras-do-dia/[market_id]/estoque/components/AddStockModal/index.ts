"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

import { registerOffer } from "@admin/_actions/offers/POST/register-offer";
import { listProducts } from "@shared/_actions/products/GET/list-products";
import { listFarms } from "@admin/_actions/farms/GET/list-farms";
import { useHandleError } from "@shared/hooks/useHandleError";
import { addTaxToPrice } from "@shared/utils/convert-tax";
import { convertUnitToLabel } from "@shared/utils/convert-unit";
import { ProductDTO, FarmDTO } from "@shared/interfaces/dtos";

const addStockSchema = z.object({
  product_id: z
    .string({ required_error: "Produto é obrigatório" })
    .min(1, "Produto é obrigatório"),
  farm_id: z
    .string({ required_error: "Produtor é obrigatório" })
    .min(1, "Produtor é obrigatório"),
  amount: z
    .number({
      required_error: "Quantidade é obrigatória",
      invalid_type_error: "Quantidade deve ser um número",
    })
    .min(1, "Quantidade deve ser maior que zero"),
  price: z
    .number({
      required_error: "Preço é obrigatório",
      invalid_type_error: "Preço deve ser um número",
    })
    .min(0.01, "Preço deve ser maior que zero"),
  expires_at: z.string().optional(),
  description: z
    .string()
    .max(200, "Descrição deve ter no máximo 200 caracteres")
    .optional(),
  comment: z
    .string()
    .max(200, "Comentário deve ter no máximo 200 caracteres")
    .optional(),
});

type AddStockFormData = z.infer<typeof addStockSchema>;

interface UseAddStockModalProps {
  market_id: string;
  closeModal: () => void;
  reloadOffers: () => void;
}

export default function useAddStockModal({
  market_id,
  closeModal,
  reloadOffers,
}: UseAddStockModalProps) {
  const [isPending, startTransition] = useTransition();
  const { handleError } = useHandleError();
  const [selectedProduct, setSelectedProduct] = useState<{ value: string; label: string; perishable?: boolean } | null>(null);
  const [selectedProductData, setSelectedProductData] = useState<ProductDTO | null>(null);
  const [selectedFarm, setSelectedFarm] = useState<{ value: string; label: string } | null>(null);
  const [price, setPrice] = useState(0);

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    watch,
    formState: { errors },
    reset,
  } = useForm<AddStockFormData>({
    resolver: zodResolver(addStockSchema),
    mode: "onChange",
  });

  const [productsCache, setProductsCache] = useState<Map<string, ProductDTO>>(new Map());

  const searchProducts = async (search: string): Promise<{ value: string; label: string; perishable?: boolean }[]> => {
    try {
      const response = await listProducts({ page: 1, product: search, archived: false });
      if (response.message) {
        handleError(response.message);
        return [];
      }
      const products = response.data || [];
      const newCache = new Map(productsCache);
      products.forEach((product: ProductDTO) => {
        newCache.set(product.id, product);
      });
      setProductsCache(newCache);
      
      return products.map((product: ProductDTO) => ({
        value: product.id,
        label: product.name,
        perishable: product.perishable,
      }));
    } catch {
      return [];
    }
  };

  const getProductData = (productId: string): ProductDTO | null => {
    return productsCache.get(productId) || null;
  };

  const searchFarms = async (search: string): Promise<{ value: string; label: string }[]> => {
    try {
      const response = await listFarms({ page: 1, farm: search });
      if (response.message) {
        handleError(response.message);
        return [];
      }
      return (response.data || []).map((farm: FarmDTO) => ({
        value: farm.id,
        label: farm.name,
      }));
    } catch {
      return [];
    }
  };

  const onSubmit = (data: AddStockFormData) => {
    if (!selectedProduct || !selectedFarm) {
      toast.error("Selecione produto e produtor");
      return;
    }

    startTransition(async () => {
      let expiresAt: string | undefined = undefined;
      if (data.expires_at && selectedProductData && !selectedProductData.perishable) {
        const date = new Date(data.expires_at);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        expiresAt = `${day}-${month}-${year}`;
      }

      const finalAmount = selectedProductData?.pricing === "UNIT" 
        ? data.amount 
        : data.amount * 1000;

      const priceWithTax = addTaxToPrice(data.price, 0.2);

      registerOffer({
        product_id: selectedProduct.value,
        farm_id: selectedFarm.value,
        market_id,
        amount: finalAmount,
        price: priceWithTax,
        expires_at: expiresAt,
        description: data.description,
        comment: data.comment,
      })
        .then((response) => {
          if (response.message) {
            return handleError(response.message);
          }

          toast.success("Produto adicionado ao estoque com sucesso!");
          closeModal();
          reset();
          setSelectedProduct(null);
          setSelectedProductData(null);
          setSelectedFarm(null);
          setPrice(0);
          reloadOffers();
        })
        .catch(() => {
          toast.error("Erro ao adicionar produto ao estoque.");
        });
    });
  };

  return {
    register,
    handleSubmit,
    setValue,
    trigger,
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
  };
}

