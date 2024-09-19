"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { AiOutlineEye } from "react-icons/ai";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Input from "@shared/next/components/Input";
import { login } from "../../../_actions/account/login";
import Loader from "../../../components/Loader";
import { useHandleError } from "../../../hooks/useHandleError";
import { toast } from "sonner";
import { AppID } from "../../../library/types/app-id";

const schema = yup.object({
  email: yup
    .string()
    .required("Insira seu e-mail.")
    .email("Insira um e-mail válido."),
  password: yup.string().required("Insira a sua senha."),
});

export default function FormLogin({ appID }: { appID: AppID }) {
  const resolver = yupResolver(schema);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { handleError } = useHandleError();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    trigger,
  } = useForm({
    resolver,
  });

  const onSubmit = async ({ email, password }: any) => {
    setIsLoading(true);

    await login({
      email,
      password,
      appID
    })
      .then((response) => {
        if (response.message) {
          const messageError = response.message as string;
          handleError(messageError);
          setIsLoading(false);
        } else {
          toast.success("Login efetuado com sucesso!");
          setIsLoading(false);
          router.push("/");
        }
      })
      .catch(() => {
        toast.error("Erro ao efetuar login");
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const handleInput = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const { name, value } = target;

      if (name === "email" || name === "password") {
        setValue(name as "email" | "password", value);
        trigger(name as "email" | "password");
      }
    };

    const emailInput = document.querySelector("input[name='email']");
    const passwordInput = document.querySelector("input[name='password']");

    if (emailInput && passwordInput) {
      emailInput.addEventListener("input", handleInput);
      passwordInput.addEventListener("input", handleInput);
    }

    return () => {
      if (emailInput && passwordInput) {
        emailInput.removeEventListener("input", handleInput);
        passwordInput.removeEventListener("input", handleInput);
      }
    };
  }, [setValue, trigger]);



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
      <button
        disabled={isLoading}
        type="submit"
        className="w-full h-12 flex flex-col items-center justify-center font-semibold rounded-md text-base leading-[22px] bg-theme-default text-white border-0 "
      >
        {isLoading ? <Loader
          appId="PRODUCER"
          loaderType="login"
        /> : <>Entrar</>}
      </button>
    </form>
  );
}
