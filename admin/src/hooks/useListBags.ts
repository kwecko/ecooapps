import { listBags } from "@admin/_actions/bags/list-bags";
import { useHandleError } from "@shared/hooks/useHandleError";
import { BagDTO } from "@shared/interfaces/dtos";
import { useEffect, useState } from "react";

interface UseListBagsProps {
  page: number;
}

export default function useListBags({ page }: UseListBagsProps) {
  const [data, setData] = useState<BagDTO[]>([] as BagDTO[]);

  const [isLoading, setIsLoading] = useState(false);
  const { handleError } = useHandleError();
  useEffect(() => {
    (() => {
      setIsLoading(true);
      listBags({
        page: page,
      }).then((response) => {
        if (response.message) {
          handleError(response.message);
        }
        setData(response.data);
        setIsLoading(false);
      });
    })();
  }, [page]);

  const updateData = (newData: BagDTO[]) => {
    setData(newData);
  };

  return { data, updateData, isLoading };
}
