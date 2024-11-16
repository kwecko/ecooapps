import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { updateUser } from "@shared/_actions/account/update-user";
import { useHandleError } from "@shared/hooks/useHandleError";
import { IUser } from "@shared/interfaces/user";

export const useChangePasswordForm = (token: string) => {
  const { handleError } = useHandleError();
  const { register, handleSubmit, reset } = useForm<IUser>();
  const [_, setCookies, removeCookie] = useCookies();

  useEffect(() => {
    setCookies("token-reset-password", token);
  }, [token]);

  const handleSubmitForm = async (data: IUser) => {
    Object.keys(data).forEach((key) => {
      if (!data[key as keyof IUser]) {
        delete data[key as keyof IUser];
      }
    });

    if (data.password && data.password.length < 8) {
      toast.error("Senha deve ter pelo menos 8 caracteres.");
      return;
    }

    try {
      const response = await updateUser(data);
      if (response?.message) {
        toast.error(response.message);
        return;
      }

      removeCookie("token-reset-password");
      toast.success("Senha atualizada com sucesso!");
      window.location.href = "/inicio";
    } catch (error) {
      handleError(error as string);
      toast.error("Erro ao atualizar a senha.");
    }
  };

  return {
    register,
    handleSubmit,
    handleSubmitForm,
  };
};
