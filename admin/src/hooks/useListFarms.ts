import { listFarms } from "@admin/_actions/farms/GET/list-farms";
import { useHandleError } from "@shared/hooks/useHandleError";
import { FarmDTO } from "@shared/interfaces/dtos";
import { useEffect, useState } from "react";

interface UseListFarmsProps {
  page: number;
  query?: string;
}

export default function useListFarms({ page, query }: UseListFarmsProps) {
  const [data, setData] = useState<FarmDTO[]>([] as FarmDTO[]);

  const [isLoading, setIsLoading] = useState(false);
  const { handleError } = useHandleError();
  useEffect(() => {
    (() => {
      setIsLoading(true);
      listFarms({
        page: page,
        farm: query,
      }).then((response) => {
        if (response.message) {
          handleError(response.message);
        }
        setData(response.data);
        setIsLoading(false);
      });
    })();
  }, [page, query]);

  const updateData = (newData: FarmDTO[]) => {
    setData(newData);
  };

  return { data, updateData, isLoading };
}
