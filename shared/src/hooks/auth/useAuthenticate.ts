import {
  AuthenticateRequest,
  authenticate as authenticateAction,
} from "@shared/_actions/auth/POST/authenticate";
import { useHandleError } from "@shared/hooks/useHandleError";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface UseAuthenticateProps extends AuthenticateRequest {}

export default function useAuthenticate() {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const { handleError } = useHandleError();

  const authenticate = async ({
    email,
    password,
    appID,
  }: UseAuthenticateProps): Promise<boolean> => {
    setIsLoading(true);
    let success: boolean = false;
    authenticateAction({
      email,
      password,
      appID,
    })
      .then((response) => {
        if (response.message) {
          handleError(response.message);
          success = false;
        } else {
          toast.success("Login efetuado com sucesso!");
          router.push("/");
          success = true;
        }
      })
      .catch(() => {
        toast.error("Erro ao efetuar login");
        success = false;
      })
      .finally(() => {
        setIsLoading(false);
      });
    return success;
  };

  return { authenticate, isLoading };
}
