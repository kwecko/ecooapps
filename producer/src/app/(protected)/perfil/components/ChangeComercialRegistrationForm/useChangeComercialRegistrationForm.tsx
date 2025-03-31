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
  ChangeComercialRegistrationSchema,
  changeComercialRegistrationSchema,
} from "@shared/schemas/change-comercial-registration";

export const useChangeComercialRegistrationForm = () => {
  const [formData, setFormData] = useState<ChangeComercialRegistrationSchema | null>(null);
  const [photo, setPhoto] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [farmId, setFarmId] = useState<string | null>(null)
  const { handleError } = useHandleError();

  const {
    register,
    handleSubmit,
    control,
    getValues,
    reset,
    formState: { errors },
    trigger,
  } = useForm<ChangeComercialRegistrationSchema>({
    resolver: zodResolver(changeComercialRegistrationSchema),
    mode: "onChange",
    defaultValues: {
      photo: null,
      name: "",
      tally: "",
      description: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const farmResponse = await fetchUserFarm()

        if (farmResponse.message) {
          handleError(farmResponse.message);
          return;
        }

        const data = { ...farmResponse.data };
        
        setFarmId(data.id)

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
        
        // TODO: Verificar se tanto as images quanto a photo estão sendo salvas corretamente
        // TODO: Mostrar essas imagens quando possuir alguma e ser possível alterar
        reset(data);
      } catch (error) {
        toast.error(error as string);
      }
    };
    fetchData();
  }, []);

  const handleSubmitForm = (data: ChangeComercialRegistrationSchema) => {
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
      if (!data[key as keyof ChangeComercialRegistrationSchema]) {
        delete data[key as keyof ChangeComercialRegistrationSchema];
      }
    });

    const { images, ...otherData } = data;

    const farmFormData = new FormData();
    farmFormData.append("name", otherData.name || "");
    farmFormData.append("tally", otherData.tally || ""); 
    farmFormData.append("description", otherData.description || "");
    
    if (otherData.photo) {
      farmFormData.append("photo", otherData.photo);
    }

    try {
      const farmResponse = await updateFarm(farmFormData);
      // TODO: enviar as images da outra rota de atualizar as images
      // TODO: conferir as images
      // console.log(images)
      // Criar outra função para bater na rota abaixo
      // /farms/:farm_id/images

      if (farmResponse.message) {
        handleError(farmResponse.message);
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
