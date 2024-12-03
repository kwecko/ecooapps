"use client"

import Link from "next/link";
import { toast } from "sonner";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import Loader from "@shared/components/Loader";
import Button from "@shared/components/ButtonV2";
import { LoginSchema } from "@shared/types/login";
import Input from "@shared/components/CustomInput";
import { loginSchema } from "@shared/schemas/login";
import { authenticate } from "@shared/_actions/auth/POST/authenticate"
import { useHandleError } from "@shared/hooks/useHandleError"

export default function LoginForm() {
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
        appID: 'ADMIN'
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
  }

  return (
    <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6">
        <Input 
          register={register('email')}
          label="Email"
          placeholder="Insira o seu email"
          errorMessage={errors.email?.message}
        />
        <Input 
          register={register('password')}
          label="Senha"
          placeholder="Insira a sua senha"
          errorMessage={errors.password?.message}
          type="password"
        />
      </div>
      <div className="flex flex-col gap-5 justify-center">
        <Button
          type="submit"
          variant="default"
          className="bg-theme-home-bg"
        >
          {isPending && <Loader loaderType="login" />}
          {!isPending && "Entrar"}
        </Button>
        <span className="leading-[22px] font-medium tracking-tight text-center text-theme-default">
          Esqueceu a senha? <Link href={"/recuperar-senha"} className="underline">Clique aqui</Link>
          <span className="inter-font underline"></span>
        </span>
      </div>
    </form>
  )
}