import { fetchBox as fetchBoxAction } from "@cdd/app/_actions/boxes/GET/fetch-box";
import { useHandleError } from "@shared/hooks/useHandleError";
import { useLocalStorage } from "@shared/hooks/useLocalStorage";
import { BoxDTO } from "@shared/interfaces/dtos";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface UseFetchBoxProps {
  box_id: string;
  page: number;
}

export default function useFetchBox({ box_id, page }: UseFetchBoxProps) {
  const [data, setData] = useState<BoxDTO | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { handleError } = useHandleError();
  const { getFromStorage } = useLocalStorage();

  const fetchBox = async () => {
    const cycle = getFromStorage("selected-cycle");

    if (!cycle) {
      toast.error("Selecione um ciclo para receber ofertas!");
      return;
    }

    await fetchBoxAction({
      box_id: box_id,
      page: page,
    })
      .then((response: any) => {
        if (response.message) {
          const messageError = response.message as string;
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
    fetchBox().finally(() => {
      setIsLoading(false);
    });
  }, [box_id, page]);

  return { data, isLoading, fetchBox };
}
