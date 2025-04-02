import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";
import { updateFarm } from "@producer/_actions/farms/PATCH/update-farm";
import { fetchUserFarm } from "@shared/_actions/farms/GET/fetch-user-farm";
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
  const [farmId, setFarmId] = useState<string | null>(null);
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
        const farmResponse = await fetchUserFarm();

        if (farmResponse.message) {
          handleError(farmResponse.message);
          return;
        }

        const data = { ...farmResponse.data };
        setFarmId(data.id);

        if (data.photo && typeof data.photo === "string") {
          setPhoto(
            data.photo.startsWith("file:///___/rest-api/src/test/storage/temp/users/")
              ? `/api/image?file=${data.photo}`
              : data.photo
          );
        }

        setCharCount(data.description?.length || 0);
        reset(data);
      } catch (error) {
        toast.error(error as string);
      }
    };
    fetchData();
  }, [reset, handleError]);

  const handleSubmitForm = (data: ChangeComercialRegistrationSchema) => {
    setFormData(data);
    setIsModalOpen(true);
  };

  const sendImages = async (farmId: string, images: File[]) => {
    const formData = new FormData();
    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const response = await fetch(`/farms/${farmId}/images`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar imagens.");
      }

      console.log("Imagens enviadas com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar imagens:", error);
      toast.error("Erro ao enviar imagens.");
    }
  };

  const confirmSubmission = async () => {
    if (!formData || !farmId) return;

    const isValid = await trigger();
    if (!isValid) {
      toast.error("Erro no formulário. Verifique os campos e tente novamente.");
      return;
    }

    const { images, ...otherData } = formData;
    const farmFormData = new FormData();
    farmFormData.append("name", otherData.name || "");
    farmFormData.append("tally", otherData.tally || "");
    farmFormData.append("description", otherData.description || "");
    if (otherData.photo) {
      farmFormData.append("photo", otherData.photo);
    }

    try {
      const farmResponse = await updateFarm(farmId, farmFormData);

      if (farmResponse.message) {
        handleError(farmResponse.message);
        return;
      }

      if (images && images.length > 0) {
        await sendImages(farmId, images);
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