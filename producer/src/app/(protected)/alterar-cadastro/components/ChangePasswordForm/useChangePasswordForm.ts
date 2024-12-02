import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { updateUser } from "@shared/_actions/users/PATCH/update-user";
import { useHandleError } from "@shared/hooks/useHandleError";
import { UserDTO } from "@shared/interfaces/dtos";

interface ChangePasswordSchema extends UserDTO {
  password: string;
  confirmPassword: string;
}

export const useChangePasswordForm = (token: string) => {
  const { handleError } = useHandleError();
  const { register, handleSubmit, reset } = useForm<ChangePasswordSchema>();
  const [_, setCookies, removeCookie] = useCookies();

  useEffect(() => {
    setCookies("token-reset-password", token);
  }, [token]);

  const handleSubmitForm = async (data: ChangePasswordSchema) => {
    Object.keys(data).forEach((key) => {
      if (!data[key as keyof ChangePasswordSchema]) {
        delete data[key as keyof ChangePasswordSchema];
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
