import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";
import { deleteImage } from "@producer/_actions/farms/DELETE/delete-image";
import { updateImage } from "@producer/_actions/farms/POST/update-image";
import { updateFarm } from "@producer/_actions/farms/PATCH/update-farm";
import { fetchUserFarm } from "@shared/_actions/farms/GET/fetch-user-farm";
import { useHandleError } from "@shared/hooks/useHandleError";
import {
  ChangeComercialRegistrationSchema,
  changeComercialRegistrationSchema,
} from "@shared/schemas/change-comercial-registration";

export const useChangeComercialRegistrationForm = () => {
  const [formData, setFormData] = useState<ChangeComercialRegistrationSchema | null>(null);
  const [imagesFile, setImages] = useState< File[]>([]);
  const [photo, setPhoto] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [farmId, setFarmId] = useState<string | null>(null);
  const [isImageUplodaded, setIsImageUploaded] = useState(false);
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
        setIsImageUploaded(false);
        
        if (data.images && Array.isArray(data.images)) {
          setImages(data.images);
        }

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
  }, [reset, handleError, isImageUplodaded]);

  const handleSubmitForm = (data: ChangeComercialRegistrationSchema) => {
    setFormData(data);
    setIsModalOpen(true);
  };

  const sendImage = async (image: File) => {
    const formData = new FormData();
    formData.append("image", image as Blob);

    if (!farmId) return;

    updateImage({ farmId: farmId, data: formData })
      .then((response) => {
        if (response.message) return handleError(response.message);
        setIsImageUploaded(true);
        toast.success("Imagem enviada com sucesso!");
      })
      .catch(() => {
        toast.error("Erro desconhecido.");
      });
  };

  const removeImage = async (image: string) => {
    
    const formData = new FormData();
    formData.append("image", image);

    if (!farmId) return;

    deleteImage({ farmId: farmId, image: image })
      .then((response) => {
        if (response.message) return handleError(response.message);
        setIsImageUploaded(true);
        toast.success("Imagem removida com sucesso!");
      })
      .catch(() => {
        toast.error("Erro desconhecido.");
      });
  };

  const confirmSubmission = async () => {
    if (!formData || !farmId) return;

    const isValid = await trigger();
    if (!isValid) {
      toast.error("Erro no formulário. Verifique os campos e tente novamente.");
      return;
    }

    const { ...otherData } = formData;
    const farmFormData = new FormData();
    farmFormData.append("name", otherData.name || "");
    farmFormData.append("tally", otherData.tally || "");
    farmFormData.append("description", otherData.description || "");
    if (otherData.photo && otherData.photo != photo) {
      farmFormData.append("photo", otherData.photo);
    }

    try {
      const farmResponse = await updateFarm(farmId, farmFormData);
      
      if (farmResponse.message) {
        handleError(farmResponse.message);
        return;
      }

      toast.success("Cadastro atualizado com sucesso!");
      window.location.href = "/configuracoes";
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
    imagesFile,
    setPhoto,
    setImages,
    isModalOpen,
    sendImage,
    removeImage,
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