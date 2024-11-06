"use client";

import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";

import { login } from "@shared/_actions/account/login";
import ButtonV2 from "@shared/components/ButtonV2";
import Input from "@shared/components/Input";
import Loader from "@shared/components/Loader";
import { useHandleError } from "@shared/hooks/useHandleError";
import { AppID } from "@shared/library/types/app-id";
import { loginSchema } from "@shared/schemas/login";
import { LoginSchema } from "@shared/types/login";
import { AiOutlineEye } from "react-icons/ai";

export default function FormLogin({ appID }: { appID: AppID }) {
  const [isPending, starTransition] = useTransition();

  const router = useRouter();

  const { handleError } = useHandleError();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = ({ email, password }: LoginSchema) => {
    starTransition(async () => {
      const isValid = await trigger();

      if (!isValid) return;

      await login({
        email,
        password,
        appID,
      })
        .then((response) => {
          if (response.message) {
            handleError(response.message);
            if (response?.redirect && typeof response.redirect === "string") {
              setTimeout(() => {
                router.push(response.redirect);
              }, 800);
            }
          } else {
            toast.success("Login efetuado com sucesso!");
            router.push("/");
          }
        })
        .catch(() => {
          toast.error("Erro ao efetuar login");
        });
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2.5 pb-0.5">
        <Input
          type="text"
          label="E-mail"
          labelClassName="pb-1.5 text-sm font-inter font-normal leading-5 tracking-tight"
          register={{ ...register("email") }}
          error={errors.email?.message}
          autoComplete="email"
          className="font-normal font-inter text-base	leading-[22px] text-slate-gray"
        />
        <Input
          type="password"
          label="Senha"
          labelClassName="pb-1.5 text-sm font-inter font-normal leading-5 tracking-tight"
          icon={<AiOutlineEye size={24} />}
          register={{ ...register("password") }}
          error={errors.password?.message}
          autoComplete="password"
          className="font-normal font-inter text-base	leading-[22px]"
        />
      </div>
      <ButtonV2
        type="submit"
        variant="default"
        className="h-12 flex justify-center items-center mt-0"
      >
        {isPending ? <Loader loaderType="login" /> : "Entrar"}
      </ButtonV2>
    </form>
  );
}
