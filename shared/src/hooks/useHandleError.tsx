'use client'

import { toast } from "sonner";
import { errorsMapper } from "../errors";
import { showErrorToast } from "../components/ShowErrorToast";
import { useSessionExpiredContext } from "../context/session/index";
import { useCallback } from "react";

export function useHandleError() {
  const { setSessionExpired } = useSessionExpiredContext();

  const handleError = useCallback((errorCode: string) => {
    if (errorCode in errorsMapper) {
      const errorMessage = errorsMapper[errorCode];

      if (errorCode === "Sessão expirada.") {
        setSessionExpired(true);
      } else if (errorCode === "💥 Ocorreu um erro interno." || errorCode === "Erro desconhecido") {
        showErrorToast(errorMessage);
      } else {
        toast.error(errorMessage);
      }
    } else {
      const words = errorCode.split(" ");

      if (errorCode === `Ciclo ${words[1]} não existe.`) {
        showErrorToast(errorCode);
      } else if (errorCode === `Fazenda ${words[1]} não existe.`) {
        showErrorToast(errorCode);
      }
    }
  }, [setSessionExpired]);

  return { handleError };
}
