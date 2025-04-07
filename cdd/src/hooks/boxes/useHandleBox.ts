import {
  handleOrder as handleOrderAction,
  HandleBoxRequest,
} from "@cdd/app/_actions/orders/PATCH/handle-order";
import { useHandleError } from "@shared/hooks/useHandleError";
import { useState } from "react";
import { toast } from "sonner";

interface UseHandleBoxProps extends HandleBoxRequest {
  successMessage: string;
}

export default function useHandleBox() {
  const [isLoading, setIsLoading] = useState(false);
  const { handleError } = useHandleError();

  const handleBox = async ({
    box_id,
    order_id,
    status,
    successMessage,
  }: UseHandleBoxProps) => {
    setIsLoading(true);

    await handleOrderAction({
      box_id: box_id,
      order_id: order_id,
      status: status,
    })
      .then(async (response) => {
        if (response.message) {
          handleError(response.message);
        } else {
          toast.success(successMessage);
        }
      })
      .catch(() => {
        toast.error("Erro desconhecido.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { handleBox, isLoading };
}
