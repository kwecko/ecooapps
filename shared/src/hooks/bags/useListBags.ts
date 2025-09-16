import { listBags } from "@shared/_actions/bags/GET/list-bags";
import { useHandleError } from "@shared/hooks/useHandleError";
import { BagDTO } from "@shared/interfaces/dtos";
import { useEffect, useState } from "react";

interface UseListBagsProps {
  page: number;
  statuses: string[];
  user: string;
}

export default function useListBags({
  page,
  statuses,
  user,
}: UseListBagsProps) {
  const [data, setData] = useState<BagDTO[]>([] as BagDTO[]);

  const [isLoading, setIsLoading] = useState(false);
  const { handleError } = useHandleError();
  useEffect(() => {
    setIsLoading(true);
    listBags({
      page: page,
      statuses: statuses.filter((status) => status !== "FETCH" && status !== "FETCHED"),
      user: user,
    }).then((response) => {
      if (response.message) {
        handleError(response.message);
      }
      setData(response.data);
      setIsLoading(false);
    });
  }, [page, statuses, user]);

  const updateData = (newData: BagDTO[]) => {
    setData(newData);
  };

  return { data, updateData, isLoading };
}
