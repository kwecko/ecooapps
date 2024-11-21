import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";
import { fetchUserFarm } from "@producer/app/_actions/account/fetch-user-farm";
import { updateFarm } from "@producer/app/_actions/account/update-farm";
import { getUser } from "@shared/_actions/account/get-user";
import { updateUser } from "@shared/_actions/account/update-user";
import { useHandleError } from "@shared/hooks/useHandleError";
import { IUpdateFarm } from "@shared/interfaces/farm";
import { IUserUpdate } from "@shared/interfaces/user";
import {
  ChangeRegistrationSchema,
  changeRegistrationSchema,
} from "@shared/schemas/change-registration";

export const useChangeRegistrationForm = () => {
  const [isPending, starTransition] = useTransition();
  const { handleError } = useHandleError();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    trigger,
  } = useForm<ChangeRegistrationSchema>({
    resolver: zodResolver(changeRegistrationSchema),
    mode: "onChange",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [farmResponse, userResponse] = await Promise.all([
          fetchUserFarm(),
          getUser(),
        ]);

        if (farmResponse.message || userResponse.message) {
          handleError(farmResponse.message || userResponse.message);
          return;
        }

        const data = { ...farmResponse.data, ...userResponse.data };

        reset(data);
      } catch (error) {
        toast.error(error as string);
      }
    };
    fetchData();
  }, []);

  const handleSubmitForm = async (data: ChangeRegistrationSchema) => {
    starTransition(async () => {
      const isValid = await trigger();

      if (!isValid) {
        return;
      }
    });
    Object.keys(data).forEach((key) => {
      if (!data[key as keyof ChangeRegistrationSchema]) {
        delete data[key as keyof ChangeRegistrationSchema];
      }
    });

    const farmData: IUpdateFarm = {
      name: data.name,
      tally: data.tally,
      description: data.description,
    };

    const userData: IUserUpdate = {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone: data.phone as string,
    };

    try {
      const [farmResponse, userResponse] = await Promise.all([
        updateFarm(farmData),
        updateUser(userData),
      ]);

      if (farmResponse.message || userResponse.message) {
        handleError(farmResponse.message || userResponse.message);
        return;
      }

      toast.success("Cadastro atualizado com sucesso!");
    } catch (error) {
      handleError(error as string);
      toast.error("Erro ao atualizar o cadastro.");
    }
  };

  return {
    register,
    handleSubmit,
    handleSubmitForm,
    errors,
  };
};
