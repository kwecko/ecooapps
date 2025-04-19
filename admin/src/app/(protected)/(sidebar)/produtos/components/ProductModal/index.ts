"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";

import { zodResolver } from "@hookform/resolvers/zod";

import { useHandleError } from "@shared/hooks/useHandleError";

import { ProductSchema, productSchema } from "@admin/schemas/products";
import { registerProduct } from "@admin/_actions/products/POST/register-product";

interface UseProductModalProps {
  closeModal: () => void;
  reloadProducts: () => void;
}

export default function useProductModal({
  closeModal,
  reloadProducts,
}: UseProductModalProps) {
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
  } = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      pricing: "UNIT",
      category: "",
      archived: false,
      perishable: true,
    },
  });

  const onSubmit = ({
    name,
    pricing,
    category,
    image,
    perishable,
    archived,
  }: ProductSchema) => {
    startTransition(async () => {
      const isValid = await trigger();

      if (!isValid) return;

      const dataForm = new FormData();

      dataForm.append("name", name);
      dataForm.append("pricing", pricing);
      dataForm.append("category_id", category);
      dataForm.append("image", image);
      dataForm.append("perishable", String(perishable));
      dataForm.append("archived", String(archived));

      registerProduct(dataForm)
        .then((response) => {
          if (response.message) return handleError(response.message);

          toast.success("Produto cadastrado com sucesso!");
          closeModal();
          reset();
          reloadProducts();
        })
        .catch(() => {
          toast.error("Erro desconhecido.");
        });
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
