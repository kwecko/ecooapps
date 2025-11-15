import { listOffers } from "@admin/_actions/offers/GET/list-offers";
import { useHandleError } from "@shared/hooks/useHandleError";
import { OfferDTO } from "@shared/interfaces/dtos";
import { useEffect, useState } from "react";

interface UseListOffersProps {
  page: number;
  market_id?: string;
  cycle_id?: string;
  product?: string;
  category_id?: string;
  available?: boolean;
  since?: string;
  before?: string;
}

export default function useListOffers({
  page,
  market_id,
  cycle_id,
  product,
  category_id,
  available,
  since,
  before,
}: UseListOffersProps) {
  const [data, setData] = useState<OfferDTO[]>([] as OfferDTO[]);
  const [isLoading, setIsLoading] = useState(false);
  const { handleError } = useHandleError();

  useEffect(() => {
    setIsLoading(true);
    listOffers({
      page,
      market_id,
      cycle_id,
      product,
      category_id,
      available,
      since,
      before,
    })
      .then((response) => {
        if (response.message) {
          handleError(response.message);
        }
        setData(response.data || []);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [page, market_id, cycle_id, product, category_id, available, since, before]);

  const updateData = (newData: OfferDTO[]) => {
    setData(newData);
  };

  return { data, updateData, isLoading };
}

