"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useEffect, useState, useTransition } from "react";

import { zodResolver } from "@hookform/resolvers/zod";

import { useHandleError } from "@shared/hooks/useHandleError";
import { updateProduct } from "@admin/_actions/products/PATCH/update-product";
import { ProductDTO } from "@shared/interfaces/dtos";
import { updateProductSchema, UpdateProductSchema } from "@admin/schemas/products";

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
  // States
  const [isPending, startTransition] = useTransition();
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Consts
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
    },
  });

  useEffect(() => {
    if (product?.image) {
      setPreviewImage(product.image);
    }
  });

  // Functions
  const onSubmit = ({ name, pricing, category, image }: UpdateProductSchema) => {
    startTransition(async () => {
      const isValid = await trigger();

      if (!isValid) return;

      const dataForm = new FormData();

      if (name) dataForm.append("name", name);
      if (pricing) dataForm.append("pricing", pricing);
      if (category) dataForm.append("category_id", category);
      if (image) dataForm.append("image", image);

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
      setPreviewImage(URL.createObjectURL(selectedFile));
      setValue("image", selectedFile);
      trigger("image");
    }
  };

  const handleRemoveFile = () => {
    setPreviewImage(null);
    setValue("image", undefined);
  };

  // Returns
  return {
    register,
    setValue,
    handleSubmit,
    errors,
    isPending,
    previewImage,
    handleFileChange,
    handleRemoveFile,
    onSubmit,
  };
}
