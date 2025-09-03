import { useCallback, useEffect, useState } from "react";
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

interface FarmData {
  id: string;
  name: string;
  tally: string;
  description: string;
  photo?: string;
  images?: string[];
}

interface ImageOperations {
  toAdd: File[];
  toRemove: string[];
}

interface FormState {
  farmData: FarmData | null;
  images: ImageItem[];
  photo: string;
  isModalOpen: boolean;
  charCount: number;
  isLoading: boolean;
  imageOperations: ImageOperations;
}

const INITIAL_FORM_STATE: FormState = {
  farmData: null,
  images: [],
  photo: "",
  isModalOpen: false,
  charCount: 0,
  isLoading: false,
  imageOperations: {
    toAdd: [],
    toRemove: [],
  },
};

export const useChangeComercialRegistrationForm = () => {
  const [state, setState] = useState<FormState>(INITIAL_FORM_STATE);
  const { handleError } = useHandleError();

  const form = useForm<ChangeComercialRegistrationSchema>({
    resolver: zodResolver(changeComercialRegistrationSchema),
    mode: "onChange",
    defaultValues: {
      photo: null,
      name: "",
      tally: "",
      description: "",
    },
  });

  const { register, handleSubmit, control, getValues, reset, formState: { errors }, trigger } = form;

  const processPhotoUrl = useCallback((photo?: string): string => {
    if (!photo) return "";
    
    return photo.startsWith("file:///___/rest-api/src/test/storage/temp/users/")
      ? `/api/image?file=${photo}`
      : photo;
  }, []);

  const fetchFarmData = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      
      const response = await fetchUserFarm();
      
      if (response.message) {
        handleError(response.message);
        return;
      }

      const farmData = response.data;
      const processedPhoto = processPhotoUrl(farmData.photo);
      
      setState(prev => ({
        ...prev,
        farmData,
        images: farmData.images || [],
        photo: processedPhoto,
        charCount: farmData.description?.length || 0,
        isLoading: false,
        imageOperations: { toAdd: [], toRemove: [] },
      }));

      reset(farmData);
    } catch (error) {
      toast.error(error as string);
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, [handleError, reset, processPhotoUrl]);

  const handleSubmitForm = useCallback((data: ChangeComercialRegistrationSchema) => {
    setState(prev => ({ ...prev, isModalOpen: true }));
  }, []);

  const addImage = useCallback((image: File) => {
    setState(prev => ({
      ...prev,
      imageOperations: {
        ...prev.imageOperations,
        toAdd: [...prev.imageOperations.toAdd, image]
      },
      images: [...prev.images, image]
    }));
    
    toast.success("Imagem adicionada! Será enviada ao confirmar o formulário.");
  }, []);

  const removeImage = useCallback((image: ImageItem) => {
    if (typeof image === 'string') {
      setState(prev => ({
        ...prev,
        imageOperations: {
          ...prev.imageOperations,
          toRemove: [...prev.imageOperations.toRemove, image]
        },
        images: prev.images.filter(img => {
          if (typeof img === 'string') {
            return img !== image;
          }
          return true;
        })
      }));
    } else {
      setState(prev => ({
        ...prev,
        imageOperations: {
          ...prev.imageOperations,
          toAdd: prev.imageOperations.toAdd.filter(img => img !== image)
        },
        images: prev.images.filter(img => {
          if (img instanceof File && image instanceof File) {
            return img !== image;
          }
          return true;
        })
      }));
    }
  }, []);

  const processImageRemovals = useCallback(async () => {
    for (const imageToRemove of state.imageOperations.toRemove) {
      const encodedUrl = encodeURIComponent(encodeURIComponent(imageToRemove));
      const response = await deleteImage({ 
        farmId: state.farmData!.id, 
        image: encodedUrl 
      });
      
      if (response.message) {
        throw new Error(response.message);
      }
    }
  }, [state.imageOperations.toRemove, state.farmData]);

  const processImageAdditions = useCallback(async () => {
    for (const imageToAdd of state.imageOperations.toAdd) {
      const formData = new FormData();
      formData.append("image", imageToAdd as Blob);
      
      const response = await updateImage({ 
        farmId: state.farmData!.id, 
        data: formData 
      });
      
      if (response.message) {
        throw new Error(response.message);
      }
    }
  }, [state.imageOperations.toAdd, state.farmData]);

  const updateFarmData = useCallback(async (formData: ChangeComercialRegistrationSchema) => {
    const farmData = new FormData();
    farmData.append("name", formData.name || "");
    farmData.append("tally", formData.tally || "");
    farmData.append("description", formData.description || "");
    if (formData.photo && formData.photo instanceof File) {
      farmData.append("photo", formData.photo as Blob);
    }

    const response = await updateFarm({ farmId: state.farmData!.id, data: farmData });
    
    if (response.message) {
      throw new Error(response.message);
    }
  }, [state.farmData]);

  const confirmSubmission = useCallback(async () => {
    if (!state.farmData?.id) {
      toast.error("ID da fazenda não encontrado");
      return;
    }

    const formData = getValues();
    const isValid = await trigger();
    
    if (!isValid) {
      toast.error("Erro no formulário. Verifique os campos e tente novamente.");
      return;
    }

    try {
      setState(prev => ({ ...prev, isLoading: true }));

      await processImageRemovals();
      await processImageAdditions();
      
      await updateFarmData(formData);
      
      setState(prev => ({ 
        ...prev, 
        isModalOpen: false,
        isLoading: false,
        imageOperations: { toAdd: [], toRemove: [] }
      }));

      toast.success("Cadastro atualizado com sucesso!");
      await fetchFarmData();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      handleError(errorMessage);
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, [state.farmData, getValues, trigger, processImageRemovals, processImageAdditions, updateFarmData, handleError, fetchFarmData]);

  useEffect(() => {
    fetchFarmData();
  }, [fetchFarmData]);

  return {
    register,
    handleSubmit: handleSubmit(handleSubmitForm),
    handleSubmitForm,
    control,
    getValues,
    errors,
    confirmSubmission,
    
    photo: state.photo,
    imagesFile: state.images,
    isModalOpen: state.isModalOpen,
    charCount: state.charCount,
    isLoading: state.isLoading,
    
    sendImage: addImage,
    removeImage,
    setPhoto: (photo: string | ((prev: string) => string)) => {
      setState(prev => ({ 
        ...prev, 
        photo: typeof photo === 'function' ? photo(prev.photo) : photo 
      }));
    },
    setCharCount: (count: number | ((prev: number) => number)) => {
      setState(prev => ({ 
        ...prev, 
        charCount: typeof count === 'function' ? count(prev.charCount) : count 
      }));
    },
    setIsModalOpen: (isOpen: boolean) => setState(prev => ({ ...prev, isModalOpen: isOpen })),
  };
};