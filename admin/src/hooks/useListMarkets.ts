import { listMarkets } from "@admin/_actions/markets/GET/list-markets";
import { useHandleError } from "@shared/hooks/useHandleError";
import { MarketDTO } from "@shared/interfaces/dtos";
import { useEffect, useState } from "react";

interface UseListMarketsProps {
  page: number;
  name?: string;
  open?: boolean;
}

export default function useListMarkets({ page, name, open }: UseListMarketsProps) {
  const [data, setData] = useState<MarketDTO[]>([] as MarketDTO[]);
  const [isLoading, setIsLoading] = useState(false);
  const { handleError } = useHandleError();

  useEffect(() => {
    (() => {
      setIsLoading(true);
      listMarkets({
        page: page,
        name: name,
        open: open,
      }).then((response) => {
        if (response.message) {
          handleError(response.message);
        }
        setData(response.data);
        setIsLoading(false);
      });
    })();
  }, [page, name, open]);

  const updateData = (newData: MarketDTO[]) => {
    setData(newData);
  };

  return { data, updateData, isLoading };
}

