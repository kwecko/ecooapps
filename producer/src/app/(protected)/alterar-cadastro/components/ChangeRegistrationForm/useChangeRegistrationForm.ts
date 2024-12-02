import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateFarm,
  UpdateFarmRequest,
} from "@producer/_actions/farms/PATCH/update-farm";
import { fetchUserFarm } from "@shared/_actions/farms/GET/fetch-user-farm";
import { fetchProfile } from "@shared/_actions/users/GET/fetch-profile";
import {
  updateUser,
  UpdateUserRequest,
} from "@shared/_actions/users/PATCH/update-user";
import { useHandleError } from "@shared/hooks/useHandleError";
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
          fetchProfile(),
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

    const farmData: UpdateFarmRequest = {
      name: data.name,
      tally: data.tally,
      description: data.description,
    };

    const userData: UpdateUserRequest = {
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
