"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useTransition, useEffect, useRef, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";

import { useHandleError } from "@shared/hooks/useHandleError";
import { updateProducer } from "@admin/_actions/producers/PATCH/update-producer";
import { ProducerDTO } from "@shared/interfaces/dtos/producer-dto";

import { 
  UpdateProducerSchema,
  updateProducerSchema,
} from "@admin/schemas/producers";

interface UseUpdateProducerModalProps {
  closeModal: () => void;
  reloadProducers: () => void;
  producer: ProducerDTO | null;
  producer_id: string;
}

export default function useUpdateProducerModal({
  closeModal,
  reloadProducers,
  producer,
  producer_id,
}: UseUpdateProducerModalProps) {
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

  const isFirstRender = useRef(true);
  useEffect(() => {
    if (producer?.photo && isFirstRender.current) {
      setPreviewImage(producer.photo);
      isFirstRender.current = false;
    }
  });

  const originalProducerData = useRef<UpdateProducerSchema | null>(null);

  useEffect(() => {
    if (producer) {
      setValue("first_name", producer.first_name ?? "");
      setValue("last_name", producer.last_name ?? "");
      setValue("email", producer.email ?? "");
      setValue("cpf", producer.cpf?.replace(/[.\-]/g, "") ?? "");
      setValue("phone", producer.phone?.replace(/[()\s\-]/g, "") ?? "");
      setValue("name", producer.name ?? "");
      setValue("tally", producer.tally ?? "");
    }
  }, [producer, setValue]);

  useEffect(() => {
    if (producer) {
      originalProducerData.current = {
        first_name: producer.first_name ?? "",
        last_name: producer.last_name ?? "",
        email: producer.email ?? "",
        cpf: producer.cpf?.replace(/[.\-]/g, "") ?? "",
        phone: producer.phone?.replace(/[()\s\-]/g, "") ?? "",
        name: producer.name ?? "",
        tally: producer.tally ?? "",
      };
    }
  }, [producer]);

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

      if (producer_id) {
        if (originalProducerData.current) {
          if (first_name !== originalProducerData.current.first_name) {
            dataForm.append("first_name", first_name);
          }
          if (last_name !== originalProducerData.current.last_name) {
            dataForm.append("last_name", last_name);
          }
          if (email !== originalProducerData.current.email) {
            dataForm.append("email", email);
          }
          if (cpf !== originalProducerData.current.cpf) {
            dataForm.append("cpf", cpf);
          }
          if (phone !== originalProducerData.current.phone) {
            dataForm.append("phone", phone);
          }
          if (name !== originalProducerData.current.name) {
            dataForm.append("name", name);
          }
          if (tally !== originalProducerData.current.tally) {
            dataForm.append("tally", tally);
          }
          if (photo) {
            dataForm.append("photo", photo);
          }
        }

        if (dataForm.get("first_name") === null &&
            dataForm.get("last_name") === null &&
            dataForm.get("email") === null &&
            dataForm.get("cpf") === null &&
            dataForm.get("phone") === null &&
            dataForm.get("name") === null &&
            dataForm.get("tally") === null &&
            dataForm.get("photo") === null
          ) {
          closeModal();
          return;
        }

        updateProducer({ producer_id: producer_id, data: dataForm })
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
      } else {
        toast.error("ID do usuário não encontrado.");
      }
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
