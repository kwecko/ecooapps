"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { useForm } from "react-hook-form";

import { requestPasswordUpdate } from "@producer/_actions/users/POST/request-password-update";
import Loading from "@producer/app/loading";
import { schemaForgotPassword } from "@shared/schemas/forgot-password";

import { zodResolver } from "@hookform/resolvers/zod";
import ButtonV2 from "@shared/components/ButtonV2";
import CustomInput from "@shared/components/CustomInput";
import { ModelPage } from "@shared/components/ModelPage";

function RecuperarSenha() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>({
    resolver: zodResolver(schemaForgotPassword),
  });

  const onSubmit = async (email: { email: string }) => {
    try {
      setIsLoading(true);
      const data = await requestPasswordUpdate(email);

      if (data.message) {
        return toast.error(data.message);
      }

      sessionStorage.setItem(
        "data-sucess",
        JSON.stringify({
          title: "Código de verificação enviado",
          description:
            "Confira o seu email e a caixa de spam para redefinir a sua senha.",
          button: {
            primary: {
              router: "/login",
              name: "Voltar para a tela de login",
            },
          },
        })
      );

      router.push("/sucesso");
    } catch {
      toast.error("Erro desconhecido");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ModelPage
      title="Esqueci a senha"
      subtitle="Enviaremos um código de verificação para o email abaixo"
      overflowAuto={true}
    >
      <div className="w-full flex flex-col justify-start items-center gap-9 mt-3">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <CustomInput
            label="E-mail"
            register={register("email")}
            placeholder="Digite seu e-mail"
            errorMessage={errors.email?.message}
          />
          <ButtonV2 variant="default">Avançar</ButtonV2>
        </form>
      </div>
    </ModelPage>
  );
}

export default RecuperarSenha;
