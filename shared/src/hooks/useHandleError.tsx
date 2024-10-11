'use client'

import { toast } from "sonner";
import { errorsMapper, genericErrorsMapper } from "../errors";
import { useSessionExpiredContext } from "../context/session/index";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

export function useHandleError() {
  const { setSessionExpired } = useSessionExpiredContext();

  const router = useRouter()

  const handleError = useCallback((errorCode: string) => {
    if (errorCode in errorsMapper) {
      const errorMessage = errorsMapper[errorCode];

      if(errorCode === "Sessão expirada.") {
        setSessionExpired(true);
        return;
      }

      if(errorCode === "💥 Ocorreu um erro interno." || errorCode === "Erro desconhecido"){
        toast.error(errorMessage)
        setTimeout(() => {  
          router.push("/")
        }, 2000)

        return;
      }

      toast.error(errorCode);
    } 

    const words = errorCode.split(" ");

    if(genericErrorsMapper.includes(words[0])) {
      toast.error(`${words[0]} não encontrado.`);
      return;
    }

    if(genericErrorsMapper.includes(words[1])) {
      toast.error(`${words[0]} ${words[1]} já existe.`);
      return;
    }

    if(genericErrorsMapper.includes(words[2])){
      toast.error(`Peso inválido ${words[2]} para o produto.`);
      return;
    }

    if(genericErrorsMapper.includes(words[3])) {
      toast.error(`Não é possivel ${words[3]} produtos hoje.`);
      return;
    }
  }, [setSessionExpired]);

  return { handleError };
}
