import {
  listFarms,
  ListFarmsRequest,
} from "@admin/_actions/farms/GET/list-farms";
import { useHandleError } from "@shared/hooks/useHandleError";
import { FarmDTO } from "@shared/interfaces/dtos";
import { useEffect, useState } from "react";

interface UseListFarmsProps extends ListFarmsRequest {}

export default function useListFarms({ page, farm }: UseListFarmsProps) {
  const [data, setData] = useState<FarmDTO[]>([] as FarmDTO[]);

  const [isLoading, setIsLoading] = useState(false);
  const { handleError } = useHandleError();
  useEffect(() => {
    (() => {
      setIsLoading(true);
      listFarms({
        page,
        farm,
      }).then((response) => {
        if (response.message) {
          handleError(response.message);
        }
        setData(response.data);
        setIsLoading(false);
      });
    })();
  }, [page, farm]);

  const reloadData = async () => {
    const response = await listFarms({
      page: page,
      farm: farm,
    });
    if (response.message) {
      handleError(response.message);
    }
    setData(response.data);
  };

  const updateData = (newData: FarmDTO[]) => {
    setData(newData);
  };

  return { data, updateData, reloadData, isLoading };
}
