"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useTransition, useEffect, useRef, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";

import { useHandleError } from "@shared/hooks/useHandleError";
import { ProducerDTO } from "@shared/interfaces/dtos/producer-dto";
import { createProducer } from "@admin/_actions/producers/POST/create-producer";
import { 
  UpdateProducerSchema,
  updateProducerSchema,
} from "@admin/schemas/producers";


interface UseCreateProducerModalProps {
  closeModal: () => void;
  reloadProducers: () => void;
}

export default function useCreateProducerModal({
  closeModal,
  reloadProducers,
}: UseCreateProducerModalProps) {
  const [isPending, startTransition] = useTransition();
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const { handleError } = useHandleError();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    trigger,
    formState: { errors },
  } = useForm<UpdateProducerSchema>({
    resolver: zodResolver(updateProducerSchema),
    mode: "onChange",
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      cpf: "",
      phone: "",
      name: "",
      tally: "",
    },
  });

  // const isFirstRender = useRef(true);
  // useEffect(() => {
  //   if (producer?.photo && isFirstRender.current) {
  //     setPreviewImage(producer.photo);
  //     isFirstRender.current = false;
  //   }
  // });

  const onSubmit = ({
    first_name,
    last_name,
    email,
    cpf,
    phone,
    name,
    tally,
    photo
  }: UpdateProducerSchema) => {
    startTransition(async () => {

      const dataForm = new FormData();

      if (first_name) dataForm.append("first_name", first_name);
      if (last_name) dataForm.append("last_name", last_name);
      if (email) dataForm.append("email", email);
      if (cpf) dataForm.append("cpf", cpf);
      if (phone) dataForm.append("phone", phone);
      if (name) dataForm.append("name", name);
      if (tally) dataForm.append("tally", tally);
      if (photo) dataForm.append("photo", photo);

      createProducer({ data: dataForm })
        .then((response) => {
          if (response.message) {
            return handleError(response.message);
          }
          toast.success("Usuário atualizado com sucesso!");
          closeModal();
          reset();
          reloadProducers();
        })
        .catch((error) => {
          console.error("Update error:", error);
          toast.error("Erro desconhecido.");
        });
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }

      setPreviewImage(URL.createObjectURL(selectedFile));
      setValue("photo", selectedFile);
      trigger("photo");
    }

    event.target.value = "";
  };

  return {
    register,
    setValue,
    handleSubmit,
    errors,
    isPending,
    previewImage,
    handleFileChange,
    onSubmit,
  };
}
