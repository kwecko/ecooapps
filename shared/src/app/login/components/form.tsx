"use client";

import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";

import { authenticate } from "@shared/_actions/auth/POST/authenticate";
import ButtonV2 from "@shared/components/ButtonV2";
import CustomInput from "@shared/components/CustomInput";
import Loader from "@shared/components/Loader";
import { useHandleError } from "@shared/hooks/useHandleError";
import { AppID } from "@shared/library/types/app-id";
import { loginSchema } from "@shared/schemas/login";
import { LoginSchema } from "@shared/types/login";

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

      authenticate({
        email,
        password,
        appID,
      })
        .then((response) => {
          if (response.message) {
            handleError(response.message);
            return;
          }

          toast.success("Login efetuado com sucesso!");
          router.push("/");
        })
        .catch(() => {
          toast.error("Erro ao efetuar login");
        });
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2.5 pb-0.5">
        <CustomInput
          register={register("email")}
          label="Email"
          placeholder="Insira o seu email"
          type="text"
          errorMessage={errors.email?.message}
        />
        <CustomInput
          register={register("password")}
          label="Senha"
          placeholder="Insira a sua senha"
          type="password"
          errorMessage={errors.password?.message}
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
