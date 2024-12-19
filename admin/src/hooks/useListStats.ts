import { listStats } from "@admin/_actions/farms/GET/list-stats";
import { useHandleError } from "@shared/hooks/useHandleError";
import { BagMergeDTO } from "@shared/interfaces/dtos";
import { useEffect, useState } from "react";

interface RevenueData {
  revenue: number;
  monthly: Record<string, number>;
  daily: Record<string, number>;
}

export default function useListStats() {
  const [data, setData] = useState<RevenueData>({} as RevenueData);

  const [isLoading, setIsLoading] = useState(false);
  const { handleError } = useHandleError();
  useEffect(() => {
    (() => {
      setIsLoading(true);
      listStats().
      then((response) => {
        if (response.message) {
          handleError(response.message);
        }
        setData(response.data);
        setIsLoading(false);
      });
    })();
  },[]);

  const updateData = (newData: RevenueData) => {
    setData(newData);
  };

  return { data, updateData, isLoading };
}
