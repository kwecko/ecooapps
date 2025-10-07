"use client";

import useSendNotification from "@admin/hooks/useSendNotification";
import { zodResolver } from "@hookform/resolvers/zod";
import ButtonV2 from "@shared/components/ButtonV2";
import CustomInput from "@shared/components/CustomInput";
import CustomModal from "@shared/components/CustomModal";
import Select from "@shared/components/SelectInput";
import TextInput from "@shared/components/TextInput";
import Loader from "@shared/components/Loader";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function SendNotificationForm() {
  const sendNotificationFormSchema = z.object({
    title: z.string().min(1, { message: "Título é obrigatório" }),
    message: z.string().min(1, { message: "Mensagem é obrigatória" }),
    role: z
      .enum(["USER", "PRODUCER"], { message: "" })
      .refine((data) => data !== null, {
        message: "Selecione o público",
      }),
  });

  type SendNotificationFormSchema = z.infer<typeof sendNotificationFormSchema>;

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<SendNotificationFormSchema | null>(
    null
  );
  const [clearOptions, setClearOptions] = useState(false);

  const { sendNotification } = useSendNotification();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<SendNotificationFormSchema>({
    resolver: zodResolver(sendNotificationFormSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      message: "",
      role: undefined,
    },
  });

  const handleSubmitForm = async (data: SendNotificationFormSchema) => {
    if (data.role === null) return;
    console.log(data);
    setFormData(data);
    setIsOpen(true);
  };

  const confirmSubmission = async () => {
    if (!formData) return;
    setClearOptions(false);
    setIsLoading(true);
    const success = await sendNotification(formData);
    if (success) {
      setFormData(null);
      reset();
      setClearOptions(true);
      toast.success("Notificação enviada com sucesso!");
    }
    setIsLoading(false);
  };

  return (
    <form
      className="flex flex-col gap-5 h-full overflow-y-auto"
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <Select
        clear={clearOptions}
        useOnChange={false}
        useUseRef={false}
        label="Selecione o público"
        options={[
          { value: "undefined", label: "Selecione..." },
          { value: "USER", label: "Todos usuários" },
          { value: "PRODUCER", label: "Todos produtores" },
        ]}
        register={register("role")}
        errorMessage={errors.role?.message}
      />
      <CustomInput
        name="title"
        type="text"
        label="Título da notificação"
        register={register("title")}
        errorMessage={errors.title?.message}
      />
      <TextInput
        name="message"
        label="Escreva a sua mensagem"
        maxLength={2000}
        className="min-h-40"
        register={register("message")}
        errorMessage={errors.message?.message}
      />
      <ButtonV2
        variant="default"
        type="submit"
        className="bg-theme-highlight"
        disabled={!isValid}
      >
        {isLoading ? <Loader loaderType="component" /> : "Enviar notificação"}
      </ButtonV2>
      <CustomModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        approveAction={confirmSubmission}
        rejectAction={() => setIsOpen(false)}
        approveActionLoading={isLoading}
        titleConfirmModal="Enviar"
        bgConfirmModal="#00735E"
        titleCloseModal="Cancelar"
        bgCloseModal="#EEF1F4"
        titleContentModal="Atenção"
        contentModal={`Você confirma que quer enviar uma nova mensagem para o público alvo "${formData?.role === "USER" ? "Usuários online" : "Produtores online"}"?`}
      />
    </form>
  );
}
