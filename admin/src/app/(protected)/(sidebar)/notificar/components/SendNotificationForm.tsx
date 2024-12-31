"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import ButtonV2 from "@shared/components/ButtonV2";
import Select from "@shared/components/SelectInput";
import TextInput from "@shared/components/TextInput";
import { useForm } from "react-hook-form";
import { HiOutlinePaperClip } from "react-icons/hi";
import { z } from "zod";

export default function SendNotificationForm() {
  const sendNotificationFormSchema = z.object({
    public: z.enum([
      "online_customers",
      "offline_customers",
      "all_customers",
      "all_producers",
    ]),
    message: z.string().max(2000),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(sendNotificationFormSchema),
    mode: "onChange",
    defaultValues: {
      public: "online_customers",
      message: "",
    },
  });

  return (
    <form className="flex flex-col gap-5 h-full overflow-y-auto">
      <Select
        label="Selecione o público"
        options={[
          { value: "online_customers", label: "Clientes online" },
          { value: "offline_customers", label: "Clientes offline" },
          { value: "all_customers", label: "Todos os clientes" },
          { value: "all_producers", label: "Todos os produtores" },
        ]}
        {...register("public")}
      />
      <TextInput
        name="message"
        label="Escreva a sua mensagem"
        maxLength={2000}
        className="min-h-40"
        register={register}
      />
      <label className="flex items-center gap-3 cursor-pointer">
        <HiOutlinePaperClip className="text-theme-primary" size={18} />
        <span className="text-theme-primary font-inter text-sm leading-4.75 tracking-tight-2 underline underline-offset-[3px] font-normal">
          Clique aqui para{" "}
          <strong className="font-bold">anexar arquivos</strong>
        </span>
      </label>
      <ButtonV2
        variant="default"
        type="submit"
        className="bg-theme-highlight mt-2.5"
      >
        Enviar notificação
      </ButtonV2>
    </form>
  );
}
