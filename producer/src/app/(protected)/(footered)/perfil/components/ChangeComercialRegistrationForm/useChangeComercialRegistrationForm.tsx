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

type ImageItem = string | File;

export const useChangeComercialRegistrationForm = () => {
  const [formData, setFormData] = useState<ChangeComercialRegistrationSchema | null>(null);
  const [imagesFile, setImages] = useState<ImageItem[]>([]);
  const [photo, setPhoto] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [farmId, setFarmId] = useState<string | null>(null);
  const [isImageUplodaded, setIsImageUploaded] = useState(false);
  const { handleError } = useHandleError();

  // Estados para gerenciar imagens localmente
  const [imagesToAdd, setImagesToAdd] = useState<File[]>([]);
  const [imagesToRemove, setImagesToRemove] = useState<string[]>([]);
  const [originalImages, setOriginalImages] = useState<string[]>([]);

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
          setOriginalImages(data.images);
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

  const sendImage = (image: File) => {
    // Adiciona a imagem à lista de imagens para adicionar
    setImagesToAdd(prev => [...prev, image]);
    
    // Atualiza a lista de imagens visualmente
    setImages(prev => [...prev, image]);
    
    toast.success("Imagem adicionada! Será enviada ao confirmar o formulário.");
  };

  const removeImage = (image: ImageItem) => {
    if (typeof image === 'string') {
      // Se é uma string, é uma imagem existente que deve ser removida
      setImagesToRemove(prev => [...prev, image]);
      setImages(prev => prev.filter(img => {
        if (typeof img === 'string') {
          return img !== image;
        }
        return true; // Mantém os Files
      }));
      toast.success("Imagem removida! A remoção será confirmada ao enviar o formulário.");
    } else {
      // Se é um File, é uma imagem nova que foi adicionada mas não enviada
      setImagesToAdd(prev => prev.filter(img => img !== image));
      setImages(prev => prev.filter(img => {
        if (img instanceof File && image instanceof File) {
          return img !== image;
        }
        return true; // Mantém as strings
      }));
      toast.success("Imagem removida!");
    }
  };

  const confirmSubmission = async () => {
    if (!formData || !farmId) return;

    const isValid = await trigger();
    if (!isValid) {
      toast.error("Erro no formulário. Verifique os campos e tente novamente.");
      return;
    }

    try {
      console.log("Imagens para remover:", imagesToRemove);
      console.log("Imagens para adicionar:", imagesToAdd);
      console.log("Imagens atuais:", imagesFile);

      // Primeiro, remove as imagens que devem ser removidas
      for (const imageToRemove of imagesToRemove) {
        console.log("Removendo imagem:", imageToRemove);
        
        // Codifica a URL como era feito antes
        const encodedUrl = encodeURIComponent(encodeURIComponent(imageToRemove));
        console.log("URL codificada:", encodedUrl);
        
        const response = await deleteImage({ farmId: farmId, image: encodedUrl });
        if (response.message) {
          handleError(response.message);
          return;
        }
      }

      // Depois, adiciona as novas imagens
      for (const imageToAdd of imagesToAdd) {
        console.log("Adicionando imagem:", imageToAdd);
        const formData = new FormData();
        formData.append("image", imageToAdd as Blob);
        
        const response = await updateImage({ farmId: farmId, data: formData });
        if (response.message) {
          handleError(response.message);
          return;
        }
      }

      // Por fim, atualiza os dados da fazenda
      const { ...otherData } = formData;
      const farmFormData = new FormData();
      farmFormData.append("name", otherData.name || "");
      farmFormData.append("tally", otherData.tally || "");
      farmFormData.append("description", otherData.description || "");
      if (otherData.photo) {
        farmFormData.append("photo", otherData.photo);
      }

      const farmResponse = await updateFarm(farmId, farmFormData);
      
      if (farmResponse.message) {
        handleError(farmResponse.message);
        return;
      }

      // Limpa os estados de controle de imagens
      setImagesToAdd([]);
      setImagesToRemove([]);
      setIsImageUploaded(true);

      toast.success("Cadastro atualizado com sucesso!");
      // window.location.href = "/configuracoes";
    } catch (error) {
      console.error("Erro no confirmSubmission:", error);
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