'use client'

import { toast } from "sonner";
import { errorsMapper } from "../../../errors";
import { showErrorToast } from "@cdd/components/ShowErrorToast";
import { useSessionExpiredContext } from "@cdd/context";
import { useCallback } from "react";

export function useHandleError() {
  const { setSessionExpired } = useSessionExpiredContext();

  const handleError = useCallback((errorCode: string) => {
    if (errorCode in errorsMapper) {
      if (errorCode === "Sessão expirada.") {
        console.log("Sessão expirada");
        setSessionExpired(true);
      } else if (errorCode === "💥 Ocorreu um erro interno.") {
        showErrorToast("Ocorreu um erro interno de servidor.", "Voltar à tela inicial", "/");
      } else {
        toast.error(errorCode);
      }
    } else {
      const words = errorCode.split(" ");

      if (errorCode === `Ciclo ${words[1]} não existe.`) {
        showErrorToast(`Ciclo "${words[1]}" não existe.`, "Voltar à tela inicial", "/");
      } else if (errorCode === `Fazenda ${words[1]} não existe.`) {
        showErrorToast(`Fazenda "${words[1]}" não existe.`, "Voltar à tela inicial", "/");
      }
    }
  }, [setSessionExpired]);

  return { handleError };
}
