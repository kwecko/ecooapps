import { listCycles as listCyclesAction } from "@shared/_actions/cycles/GET/list-cycles";
import { CycleDTO } from "@shared/interfaces/dtos";
import { useState } from "react";
import { useHandleError } from "../useHandleError";

export default function useListCycles() {
  const [data, setData] = useState<CycleDTO[]>([] as CycleDTO[]);
  const [isLoading, setIsLoading] = useState(false);
  const { handleError } = useHandleError();

  const listCycles = async () => {
    setIsLoading(true);
    await listCyclesAction()
      .then((response) => {
        if (response.message) {
          const messageError = response.message as string;
          handleError(messageError);
        } else {
          setData(response.data);
        }
      })
      .catch(() => {
        handleError("Erro ao buscar os ciclos.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { data, isLoading, listCycles };
}
