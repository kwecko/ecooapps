import { fetchMarket } from "@admin/_actions/markets/GET/fetch-market";
import { useHandleError } from "@shared/hooks/useHandleError";
import { MarketDTO } from "@shared/interfaces/dtos";
import { useEffect, useState } from "react";

interface UseFetchMarketProps {
  market_id: string;
  page?: number;
}

export default function useFetchMarket({ market_id, page = 1 }: UseFetchMarketProps) {
  const [data, setData] = useState<MarketDTO | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { handleError } = useHandleError();

  useEffect(() => {
    if (!market_id) return;

    (() => {
      setIsLoading(true);
      fetchMarket({
        market_id,
        page,
      }).then((response) => {
        if (response.message) {
          handleError(response.message);
        }
        setData(response.data);
        setIsLoading(false);
      });
    })();
  }, [market_id, page]);

  const updateData = (newData: MarketDTO) => {
    setData(newData);
  };

  return { data, updateData, isLoading };
}

