'use client'

import { resetPassword } from '@producer/app/_actions/user/reset-password';
import Loading from '@producer/app/loading';
import Input from '@shared/components/Input';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

function RecuperarSenha() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { register, handleSubmit } = useForm<{ email: string }>();
  const router = useRouter();

  const onSubmit = async (email: { email: string }) => {
    try {
      setIsLoading(true);
      const data = await resetPassword(email);

      if (data.message) {
        return toast.error(data.message)
      }

      sessionStorage.setItem(
        "data-sucess",
        JSON.stringify({
          title: "Código de verificação enviado",
          description: "Confira o seu email e a caixa de spam para redefinir a sua senha.",
          button: {
            primary: {
              router: "/login",
              name: "Voltar para a tela de login"
            },
          },
        })
      );

      router.push("/successo");
    } catch {
      toast.error('Erro desconhecido');
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className='h-[inherit] w-full flex pl-3 pr-3 pt-3 flex-col justify-start items-center gap-9'>
      <div className="w-full flex flex-col items-center justify-end pt-28 mb-4 gap-2.5">
        <h1 className="text-3xl font-medium text-slate-gray pt-3">Esqueci a senha</h1>
        <span className="text-sm font-medium text-slate-gray w-2/3 text-center">
          Enviaremos um código de verificação para o email abaixo
        </span>
      </div>

      <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="E-mail"
          labelClassName="pb-1.5 text-sm font-inter font-normal leading-5 tracking-tight"
          register={{ ...register("email") }}
          autoComplete="email"
          className="text-slate-gray w-full"
          placeholder='Digite seu e-mail'
        />
        <button className="w-full bg-theme-default rounded-md h-12 mt-6 text-white font-semibold">
          Avançar
        </button>
      </form>
    </div>
  );
}

export default RecuperarSenha;