"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useEffect, useState, useTransition, useRef } from "react";

import { zodResolver } from "@hookform/resolvers/zod";

import { useHandleError } from "@shared/hooks/useHandleError";
import { updateProduct } from "@admin/_actions/products/PATCH/update-product";
import { ProductDTO } from "@shared/interfaces/dtos";
import {
  updateProductSchema,
  UpdateProductSchema,
} from "@admin/schemas/products";

interface UseUpdateProductModalProps {
  closeModal: () => void;
  reloadProducts: () => void;
  product: ProductDTO | null;
}

export default function useUpdateProductModal({
  closeModal,
  reloadProducts,
  product,
}: UseUpdateProductModalProps) {
  const [isPending, startTransition] = useTransition();
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const { handleError } = useHandleError();

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    reset,
    formState: { errors },
  } = useForm<UpdateProductSchema>({
    resolver: zodResolver(updateProductSchema),
    mode: "onChange",
    defaultValues: {
      name: product?.name ?? "",
      pricing: product?.pricing ?? "UNIT",
      category: product?.category_id ?? "",
      archived: product?.archived ?? false,
      perishable: product?.perishable ?? true,
    },
  });

  const isFirstRender = useRef(true);
  useEffect(() => {
    if (product?.image && isFirstRender.current) {
      setPreviewImage(product.image);
      isFirstRender.current = false;
    }
  });

  const onSubmit = ({
    name,
    pricing,
    category,
    image,
    perishable,
  }: UpdateProductSchema) => {
    startTransition(async () => {
      const isValid = await trigger();

      if (!isValid) return;

      const dataForm = new FormData();

      if (name) dataForm.append("name", name);
      if (pricing) dataForm.append("pricing", pricing);
      if (category) dataForm.append("category_id", category);
      if (image) dataForm.append("image", image);
      if (perishable) dataForm.append("perishable", perishable.toString());

      if (product?.id) {
        updateProduct({ product_id: product.id, data: dataForm })
          .then((response) => {
            if (response.message) return handleError(response.message);

            toast.success("Produto atualizado com sucesso!");
            closeModal();
            reset();
            reloadProducts();
          })
          .catch(() => {
            toast.error("Erro desconhecido.");
          });
      } else {
        toast.error("ID do produto não encontrado.");
      }
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }

      setPreviewImage(URL.createObjectURL(selectedFile));
      setValue("image", selectedFile);
      trigger("image");
    }

    event.target.value = "";
  };

  return {
    register,
    setValue,
    handleSubmit,
    errors,
    isPending,
    previewImage,
    handleFileChange,
    onSubmit,
  };
}
