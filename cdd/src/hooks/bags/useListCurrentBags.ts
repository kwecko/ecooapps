import {
  listCurrentBags as listCurrentBagsAction,
  ListCurrentBagsRequest,
} from "@cdd/app/_actions/bags/GET/list-current-bags";
import { useHandleError } from "@shared/hooks/useHandleError";
import { useLocalStorage } from "@shared/hooks/useLocalStorage";
import { BagDTO } from "@shared/interfaces/dtos";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface UseListCurrentBagsProps
  extends Omit<ListCurrentBagsRequest, "cycle_id"> {}

export default function useListCurrentBags({
  page,
  statuses,
  user,
}: UseListCurrentBagsProps) {
  const [data, setData] = useState<BagDTO[]>([] as BagDTO[]);
  const [isLoading, setIsLoading] = useState(false);
  const { handleError } = useHandleError();
  const { getFromStorage } = useLocalStorage();

  const listCurrentBags = async () => {
    setIsLoading(true);
    const cycle = getFromStorage("selected-cycle");

    if (!cycle) {
      toast.error("Selecione um ciclo para ver os pedidos!");
      return;
    }

    const { id } = cycle;

    await listCurrentBagsAction({
      page: page,
      cycle_id: id,
      statuses: statuses,
      user: user,
    }).then((response) => {
      if (response.message) {
        handleError(response.message);
      }
      setData(response.data);
    });
  };

  useEffect(() => {
    listCurrentBags().finally(() => {
      setIsLoading(false);
    });
  }, [page, statuses, user]);

  const updateData = (newData: BagDTO[]) => {
    setData(newData);
  };

  return { data, updateData, isLoading };
}
