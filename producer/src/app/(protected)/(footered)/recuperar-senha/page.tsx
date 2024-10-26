'use client'

import { resetPassword } from '@producer/app/_actions/user/reset-password';
import Loading from '@producer/app/loading';
import ButtonV2 from '@shared/components/ButtonV2';
import Input from '@shared/components/Input';
import { ModelPage } from '@shared/components/ModelPage';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

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

      router.push("/sucesso");
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
    <ModelPage
      title="Esqueci a senha"
      subtitle="Enviaremos um código de verificação para o email abaixo"
      overflowAuto={true}
    >
      <div className='w-full flex p-3 flex-col justify-start items-center gap-9 mt-3'>
        <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="E-mail"
            labelClassName="pb-1.5 text-sm font-inter font-normal leading-5 tracking-tight"
            register={{ ...register("email") }}
            autoComplete="email"
            className="text-slate-gray w-full"
            placeholder='Digite seu e-mail'
          />
          <ButtonV2 variant='default'>
            Avançar
          </ButtonV2>
        </form>
      </div>
    </ModelPage>
  );
}

export default RecuperarSenha;