import {
  FetchCurrentBoxRequest,
  fetchCurrentBox as fetchCurrentBoxAction,
} from "@shared/_actions/boxes/GET/fetch-current-box";
import { useCycleProvider } from "@shared/context/cycle";
import { useHandleError } from "@shared/hooks/useHandleError";
import { BoxDTO } from "@shared/interfaces/dtos";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface UseFetchCurrentBoxProps
  extends Omit<FetchCurrentBoxRequest, "cycle_id"> {}

export default function useFetchCurrentBox({ page }: UseFetchCurrentBoxProps) {
  const [data, setData] = useState<BoxDTO>({} as BoxDTO);
  const [isLoading, setIsLoading] = useState(false);

  const { handleError } = useHandleError();

  const { cycle } = useCycleProvider();

  const cycle_id = cycle?.id;

  const fetchCurrentBox = async () => {
    if (!cycle_id) {
      return;
    }

    setIsLoading(true);
    await fetchCurrentBoxAction({
      cycle_id: cycle_id,
      page: page,
    })
      .then((response: any) => {
        if (response.message) {
          const messageError = response.message as string;
          setData({} as BoxDTO);
          handleError(messageError);
        } else if (response.data) {
          setData(response.data);
          return;
        }
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  useEffect(() => {
    fetchCurrentBox().finally(() => {
      setIsLoading(false);
    });
  }, [page, cycle_id]);

  return { data, isLoading, fetchCurrentBox };
}
