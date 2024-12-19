import {
  UpdateCatalogRequest,
  updateCatalog as updateCatalogAction,
} from "@producer/_actions/catalogs/PATCH/update-catalog";
import { useHandleError } from "@shared/hooks/useHandleError";
import { useState } from "react";
import { toast } from "sonner";

interface UseUpdateCatalogProps extends UpdateCatalogRequest {
  successMessage: string;
}

interface DeleteOffersProps extends Omit<UpdateCatalogRequest, "offers"> {
  offers: { id: string }[];
}

//omit offers.deleted
interface UpdateOffersProps extends Omit<UpdateCatalogRequest, "offers"> {
  offers: Omit<UpdateCatalogRequest["offers"][0], "deleted">[];
}

export default function useUpdateCatalog() {
  const [isLoading, setIsLoading] = useState(false);
  const { handleError } = useHandleError();

  const updateCatalog = async (
    data: UseUpdateCatalogProps
  ): Promise<boolean> => {
    setIsLoading(true);
    let success: boolean = false;
    await updateCatalogAction(data)
      .then((response) => {
        if (response.message) {
          const messageError = response.message as string;
          handleError(messageError);
          success = false;
        } else {
          toast.success("Catálogo atualizado com sucesso.");
          success = true;
        }
      })
      .catch(() => {
        handleError("Erro ao atualizar o catálogo.");
        success = false;
      })
      .finally(() => {
        setIsLoading(false);
      });
    return success;
  };

  const deleteOffers = async (data: DeleteOffersProps): Promise<boolean> => {
    const offers = data.offers.map((offer) => ({ ...offer, deleted: true }));
    return updateCatalog({
      ...data,
      offers: offers as UseUpdateCatalogProps["offers"],
      successMessage: "Oferta removida com sucesso.",
    });
  };

  const updateOffers = async (data: UpdateOffersProps): Promise<boolean> => {
    return await updateCatalog(data as UseUpdateCatalogProps);
  };

  return { deleteOffers, updateOffers, isLoading };
}
