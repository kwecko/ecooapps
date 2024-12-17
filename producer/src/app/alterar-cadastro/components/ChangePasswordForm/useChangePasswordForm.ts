import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";
import { updateUser } from "@shared/_actions/users/PATCH/update-user";
import { useHandleError } from "@shared/hooks/useHandleError";
import {
  changePasswordSchema,
  ChangePasswordSchema,
} from "@shared/schemas/change-password";

export const useChangePasswordForm = (token: string) => {
  const { handleError } = useHandleError();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    mode: "onChange",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const [_, setCookies, removeCookie] = useCookies();

  useEffect(() => {
    setCookies("token-reset-password", token);
  }, [token]);

  const handleSubmitForm = async (data: ChangePasswordSchema) => {
    try {
      const formData = new FormData();
      formData.append("password", data.password);

      const response = await updateUser(formData);
      if (response?.message) {
        toast.error(response.message);
        return;
      }

      removeCookie("token-reset-password");
      toast.success("Senha atualizada com sucesso!");
      window.location.href = "/login";
    } catch (error) {
      handleError(error as string);
      toast.error("Erro ao atualizar a senha.");
    }
  };

  return {
    errors,
    register,
    handleSubmit,
    handleSubmitForm,
  };
};
