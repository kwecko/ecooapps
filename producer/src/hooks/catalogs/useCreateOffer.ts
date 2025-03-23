import { useState } from "react";

import {
  CreateOfferRequest,
  createOffer as createOfferAction,
} from "@producer/app/_actions/offers/POST/create-offer";

import { useCycleProvider } from "@shared/context/cycle";
import { useHandleError } from "@shared/hooks/useHandleError";

interface UseCreateOfferProps extends Omit<CreateOfferRequest, "cycle_id"> {}

export default function useCreateOffer() {
  const [isLoading, setIsLoading] = useState(false);
  const { handleError } = useHandleError();

  const { cycle } = useCycleProvider();

  const cycle_id = cycle?.id;

  const createOffer = async (data: UseCreateOfferProps): Promise<boolean> => {
    let success: boolean = false;
    if (!cycle_id) {
      handleError("Ciclo não encontrado.");
      return false;
    }
    setIsLoading(true);
    await createOfferAction({
      cycle_id: cycle_id,
      ...data,
    })
      .then((response) => {
        if (response.message) {
          handleError(response.message as string);
          success = false;
        } else {
          success = true;
        }
      })
      .catch(() => {
        handleError("Erro ao cadastrar a oferta.");
        success = false;
      })
      .finally(() => {
        setIsLoading(false);
      });
    return success;
  };

  return { createOffer, isLoading };
}
