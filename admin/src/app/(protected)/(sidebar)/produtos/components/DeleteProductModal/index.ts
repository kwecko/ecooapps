import { toast } from "sonner";
import { useTransition } from "react";

import { useHandleError } from "@shared/hooks/useHandleError";

import { updateProduct } from "@admin/_actions/products/PATCH/update-product";

interface UseDeleteProductModalProps {
  closeModal: () => void;
  reloadProducts: () => void;
}

export default function useDeleteProductModal({
  closeModal,
  reloadProducts,
}: UseDeleteProductModalProps) {
  const [isPending, startTransition] = useTransition();
  const { handleError } = useHandleError();

  const handleDelete = (id: string) => {
    startTransition(async () => {
      if (!id) return;

      const dataForm = new FormData();
      dataForm.append("archived", "true");

      updateProduct({ product_id: id, data: dataForm })
        .then((response) => {
          if (response.message) return handleError(response.message);

          toast.success("Produto deletado com sucesso!");
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
    handleDelete,
  };
}
