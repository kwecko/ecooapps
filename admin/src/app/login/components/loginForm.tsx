"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

import Button from "@shared/components/ButtonV2";
import Input from "@shared/components/CustomInput";
import Loader from "@shared/components/Loader";
import useAuthenticate from "@shared/hooks/auth/useAuthenticate";
import { loginSchema } from "@shared/schemas/login";
import { LoginSchema } from "@shared/types/login";

export default function LoginForm() {
  const [isPending, starTransition] = useTransition();

  const router = useRouter();

  const { authenticate } = useAuthenticate();

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

  const onSubmit = async ({ email, password }: LoginSchema) => {
    starTransition(async () => {
      const isValid = await trigger();

      if (!isValid) return;

      const success = authenticate({
        email,
        password,
        appID: "ADMIN",
      });
      if (!success) return;
      router.push("/");
    });
  };

  return (
    <form
      className="w-full flex flex-col gap-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-6">
        <Input
          register={register("email")}
          label="Email"
          placeholder="Insira o seu email"
          errorMessage={errors.email?.message}
        />
        <Input
          register={register("password")}
          label="Senha"
          placeholder="Insira a sua senha"
          errorMessage={errors.password?.message}
          type="password"
        />
      </div>
      <div className="flex flex-col gap-5 justify-center">
        <Button type="submit" variant="default" className="bg-theme-home-bg">
          {isPending && <Loader loaderType="login" />}
          {!isPending && "Entrar"}
        </Button>
        <span className="leading-[22px] font-medium tracking-tight text-center text-theme-default">
          Esqueceu a senha?{" "}
          <Link href={"/recuperar-senha"} className="underline">
            Clique aqui
          </Link>
          <span className="inter-font underline"></span>
        </span>
      </div>
    </form>
  );
}
