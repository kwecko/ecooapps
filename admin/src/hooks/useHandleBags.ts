import {
  handleBag as handleBagAction,
  HandleBagRequest,
} from "@admin/_actions/bags/handle-bag";
import { useHandleError } from "@shared/hooks/useHandleError";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface UseHandleBagProps extends HandleBagRequest {
  successMessage: string;
  successRedirect?: string;
}

export default function useHandleBag() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { handleError } = useHandleError();

  const handleBag = async ({
    bag_id,
    status,
    successMessage,
    successRedirect,
  }: UseHandleBagProps) => {
    setIsLoading(true);

    await handleBagAction({
      bag_id: bag_id,
      status: status,
    })
      .then(async (response) => {
        if (response.message) {
          handleError(response.message);
        } else {
          if (successRedirect) router.push(successRedirect);
          toast.success(successMessage);
        }
      })
      .catch((error) => {
        console.error("Erro ao atualizar status da sacola:", error);
        toast.error("Erro ao atualizar status da sacola. Tente novamente.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { handleBag, isLoading };
}
