import {
  RequestPasswordUpdateRequest,
  requestPasswordUpdate as requestPasswordUpdateAction,
} from "@shared/_actions/auth/POST/request-password-update";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useHandleError } from "../useHandleError";

interface UseRequestPasswordUpdateProps extends RequestPasswordUpdateRequest {}

export default function useRequestPasswordUpdate() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { handleError } = useHandleError();

  const requestPasswordUpdate = async ({
    email,
  }: UseRequestPasswordUpdateProps): Promise<boolean> => {
    setIsLoading(true);
    let success: boolean = false;
    await requestPasswordUpdateAction({ email })
      .then((response) => {
        if (response.message) {
          handleError(response.message);
          success = false;
        } else {
          toast.success(
            "Solicitação enviada com sucesso. Verifique seu e-mail."
          );
          success = true;
        }
      })
      .catch((error) => {
        console.error("Erro ao solicitar atualização de senha:", error);
        toast.error("Erro ao solicitar atualização de senha. Tente novamente.");
        success = false;
      })
      .finally(() => {
        setIsLoading(false);
      });
    return success;
  };

  return { requestPasswordUpdate, isLoading };
}
