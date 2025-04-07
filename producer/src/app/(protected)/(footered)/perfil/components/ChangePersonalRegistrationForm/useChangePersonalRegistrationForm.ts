import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";
import { fetchProfile } from "@shared/_actions/users/GET/fetch-profile";
import { updateUser } from "@shared/_actions/users/PATCH/update-user";
import { useHandleError } from "@shared/hooks/useHandleError";
import {
  ChangePersonalRegistrationSchema,
  changePersonalRegistrationSchema,
} from "@shared/schemas/change-personal-registration";

export const useChangePersonalRegistrationForm = () => {
  const [formData, setFormData] = useState<ChangePersonalRegistrationSchema | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { handleError } = useHandleError();

  const {
    register,
    handleSubmit,
    control,
    getValues,
    reset,
    formState: { errors },
    trigger,
  } = useForm<ChangePersonalRegistrationSchema>({
    resolver: zodResolver(changePersonalRegistrationSchema),
    mode: "onChange",
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await fetchProfile();

        if (userResponse.message) {
          handleError(userResponse.message);
          return;
        }

        const data = { ...userResponse.data };

        reset(data);
      } catch (error) {
        toast.error(error as string);
      }
    };
    fetchData();
  }, []);

  const handleSubmitForm = (data: ChangePersonalRegistrationSchema) => {
    setFormData(data);
    setIsModalOpen(true);
  };

  const confirmSubmission = async () => {

    if (!formData) return;

    const isValid = await trigger();
    if (!isValid) {
      toast.error("Erro no formulário. Verifique os campos e tente novamente.");
      return;
    }

    const data = { ...formData };

    Object.keys(data).forEach((key) => {
      if (!data[key as keyof ChangePersonalRegistrationSchema]) {
        delete data[key as keyof ChangePersonalRegistrationSchema];
      }
    });

    const userFormData = new FormData();
    userFormData.append("first_name", data.first_name || "");
    userFormData.append("last_name", data.last_name || "");
    userFormData.append("email", data.email || "");
    const numericPhone = data.phone ? data.phone.replace(/\D/g, '') : "";
    userFormData.append("phone", numericPhone);

    try {
      setIsLoading(true);
      const userResponse = await updateUser(userFormData);

      if (userResponse.message) {
        handleError(userResponse.message);
        return;
      }

      toast.success("Cadastro atualizado com sucesso!");
      window.location.href = "/configuracoes";
      
    } catch (error) {
      setIsLoading(false);
      handleError(error as string);
      toast.error("Erro ao atualizar o cadastro.");
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
      setFormData(null);
    }
  };

  return {
    isLoading,
    isModalOpen,
    setIsModalOpen,
    getValues,
    register,
    handleSubmit,
    handleSubmitForm,
    control,
    errors,
    confirmSubmission,
  };
};
