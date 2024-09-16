"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { AiFillEye } from "react-icons/ai";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Input from "@shared/next/components/Input";
import { login } from "../../../_actions/account/login";
import Loader from "../../../components/Loader";
import { useHandleError } from "../../../hooks/useHandleError";
import { toast } from "sonner";
import { AppID } from "../../../library/types/app-id";

import { loginAgribusinessAction } from "@shared/next/_actions/account/login-agribusiness";
import { loginCDDAction } from "../../../_actions/account/login-cdd";
import Loader from "../../../components/Loader";

const schema = yup.object({
  email: yup
    .string()
    .required("Informe o e-mail")
    .email("Informe um email válido!"),
  password: yup.string().required("Informe a senha"),
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

    await callServer(appID === "CDD" ? loginCDDAction : loginAgribusinessAction)
      .after(() => {
        toast.success("Login efetuado com sucesso.");
        router.push("/");
        setIsLoading(false);
      })
      .run({
        email,
        password,
      });

    setIsLoading(false);
  };

  useEffect(() => {
    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.name, event.target.value);
      trigger(event.target.name);
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-3 flex flex-col">
        <Input
          type="text"
          label="Email"
          register={{ ...register("email") }}
          error={errors.email?.message}
          autoComplete="email"
        />
        <Input
          label="Senha"
          type="password"
          icon={<AiFillEye />}
          register={{ ...register("password") }}
          error={errors.password?.message}
          autoComplete="password"
        />
      </div>
      <button
        disabled={isLoading}
        type="submit"
        className="w-full flex justify-center items-center px-3 py-4 font-semibold rounded-lg text-base text-white p-2 bg-slate-gray mt-6"
        style={{ minHeight: "50px" }} 
      >
        {isLoading ? <Loader className="w-6 h-6 border-white" /> : <>Entrar</>}
      </button>
    </form>
  );
}
