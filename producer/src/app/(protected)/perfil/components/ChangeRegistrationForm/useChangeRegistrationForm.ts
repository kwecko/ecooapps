import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";
import { updateFarm } from "@producer/_actions/farms/PATCH/update-farm";
import { fetchUserFarm } from "@shared/_actions/farms/GET/fetch-user-farm";
import { fetchProfile } from "@shared/_actions/users/GET/fetch-profile";
import { updateUser } from "@shared/_actions/users/PATCH/update-user";
import { useHandleError } from "@shared/hooks/useHandleError";
import {
  ChangeRegistrationSchema,
  changeRegistrationSchema,
} from "@shared/schemas/change-registration";

export const useChangeRegistrationForm = () => {
  const [formData, setFormData] = useState<ChangeRegistrationSchema | null>(null);
  const [photo, setPhoto] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const { handleError } = useHandleError();

  const {
    register,
    handleSubmit,
    control,
    getValues,
    reset,
    formState: { errors },
    trigger,
  } = useForm<ChangeRegistrationSchema>({
    resolver: zodResolver(changeRegistrationSchema),
    mode: "onChange",
    defaultValues: {
      first_name: "",
      last_name: "",
      photo: null,
      email: "",
      phone: "",
      name: "",
      tally: "",
      description: "",
    },
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

        if (data.photo && typeof data.photo === "string") {
          if (
            data.photo.startsWith(
              "file:///___/rest-api/src/test/storage/temp/users/"
            )
          ) {
            setPhoto(`/api/image?file=${data.photo}`);
          } else {
            setPhoto(data.photo);
          }
        }

        if (data.description && typeof data.description === "string") {
          setCharCount(data.description.length);
        } else {
          setCharCount(0);
        }

        reset(data);
      } catch (error) {
        toast.error(error as string);
      }
    };
    fetchData();
  }, []);

  const handleSubmitForm = (data: ChangeRegistrationSchema) => {
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
      if (!data[key as keyof ChangeRegistrationSchema]) {
        delete data[key as keyof ChangeRegistrationSchema];
      }
    });

    const userFormData = new FormData();
    userFormData.append("first_name", data.first_name || "");
    userFormData.append("last_name", data.last_name || "");
    userFormData.append("email", data.email || "");
    userFormData.append("phone", data.phone || "");

    const farmFormData = new FormData();
    farmFormData.append("name", data.name || "");
    farmFormData.append("tally", data.tally || ""); 
    farmFormData.append("description", data.description || "");
    
    if (data.photo) {
      farmFormData.append("photo", data.photo);
    }

    try {
      const [farmResponse, userResponse] = await Promise.all([
        updateFarm(farmFormData),
        updateUser(userFormData),
      ]);

      if (farmResponse.message || userResponse.message) {
        handleError(farmResponse.message || userResponse.message);
        return;
      }

      toast.success("Cadastro atualizado com sucesso!");
    } catch (error) {
      handleError(error as string);
      toast.error("Erro ao atualizar o cadastro.");
    } finally {
      setIsModalOpen(false);
      setFormData(null);
    }
  };

  return {
    photo,
    setPhoto,
    isModalOpen,
    setIsModalOpen,
    getValues,
    register,
    handleSubmit,
    handleSubmitForm,
    control,
    errors,
    confirmSubmission,
    charCount,
    setCharCount,
  };
};
