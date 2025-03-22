import { toast } from "sonner";
import { useTransition } from "react";

import { useHandleError } from "@shared/hooks/useHandleError";

import { updateProduct } from "@admin/_actions/products/PATCH/update-product";
import { ProductDTO } from "@shared/interfaces/dtos";

interface UseArchiveProductModalProps {
  closeModal: () => void;
  reloadProducts: () => void;
}

export default function useArchiveProductModal({
  closeModal,
  reloadProducts,
}: UseArchiveProductModalProps) {
  const [isPending, startTransition] = useTransition();
  const { handleError } = useHandleError();

  const handleArchive = (id: string, product: ProductDTO) => {
    startTransition(async () => {
      if (!id) return;

      console.log(product);

      const archiveMessage = `Produto ${product.archived ? "desocultado" : "ocultado"} com sucesso!`;
      const dataForm = new FormData();
      if (product.name) dataForm.append("name", product.name);
      if (product.pricing) dataForm.append("pricing", product.pricing);
      if (product.category_id) dataForm.append("category_id", product.category_id);
      if (product.image && typeof product.image === "object")
        dataForm.append("image", product.image as Blob);
      if (typeof product.perishable == "boolean")
        dataForm.append("perishable", String(product.perishable));
      if (typeof product.archived == "boolean")
        dataForm.append("archived", String(!product.archived));

      updateProduct({ product_id: id, data: dataForm })
        .then((response) => {
          if (response.message) return handleError(response.message);

          toast.success(archiveMessage);
          closeModal();
          reloadProducts();
        })
        .catch(() => {
          toast.error("Erro desconhecido.");
        });
    });
  };

  return {
    isPending,
    handleArchive,
  };
}
