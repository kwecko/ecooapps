"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCookies } from "react-cookie";

import { AiOutlineEye } from "react-icons/ai";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

import { useHandleError } from "@shared/hooks/useHandleError";
import { getUser } from "@shared/_actions/account/get-user";
import { updateUser } from "@shared/_actions/account/update-user";

import Modal from "@shared/components/Modal";
import Input from "@shared/components/Input";
import Button from "@shared/components/Button";

import { User as IUser } from "@shared/interfaces/user";
import { ModelPage } from "@shared/components/ModelPage";

export default function AlterarCadastro() {
  const { handleError } = useHandleError();
  const { register, handleSubmit, reset } = useForm<IUser>();
  const searchParams = useSearchParams();
  const [_, setCookies, removeCookie] = useCookies();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token = searchParams.get("token");

  useEffect(() => {
    (async () => {
      if (token) {
        setCookies("token-reset-password", token);
        return;
      }

      await getUser()
        .then((response) => {
          if (response.message) {
            const messageError = response.message;
            handleError(messageError);
            return;
          }
          reset(response.data);
        })
        .catch((error) => {
          toast.error(error);
        });
    })();
  }, [token]);

  const handleSubmitForm = async (data: IUser) => {
    Object.keys(data).forEach((key) => {
      if (!data[key as keyof IUser]) {
        delete data[key as keyof IUser];
      }
    });

    if (data.password && data.password.length < 8) {
      toast.error("Senha deve ter pelo menos 8 caracteres.");
      return;
    }

    if (data.phone && data.phone.replace(/\D/g, "").length < 11) {
      toast.error("Formato de telefone inválido.");
      return;
    }

    await updateUser(data)
      .then((response) => {
        if (response?.message) {
          toast.error(response.message);
          return;
        }

        if (token) {
          removeCookie("token-reset-password");
          toast.success("Senha atualizada com sucesso!");
          window.location.href = "/inicio";
          return;
        }

        toast.success("Cadastro atualizado com sucesso!");
        window.location.href = "/";
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <ModelPage
      title={token ? "Recuperar senha" : "Seu perfil"}
      titleClassName="pt-17"
      titleGap="gap-2.5"
      subtitle={`Após atualizar os seus dados, clique em salvar.`}
      subtitleClassName="px-9 leading-5.5"
      buttonArea={
        <div className="w-full flex gap-2 bg-transparent h-11">
          {!token && (
            <Link className="w-full h-full" href={"/"}>
              <Button className="w-full h-full rounded-lg bg-white font-semibold text-slate-gray border-slate-gray border-2 hover:bg-gray-100">
                Voltar
              </Button>
            </Link>
          )}
          <Modal
            titleContentModal="Você tem certeza?"
            contentModal="Ao clicar em confirmar seus dados de cadastro serão atualizados."
            titleCloseModal="Cancelar"
            titleConfirmModal="Confirmar"
            titleOpenModal="Salvar"
            modalAction={handleSubmit(handleSubmitForm)}
            bgOpenModal="#2F4A4D"
            bgConfirmModal="#2F4A4D"
            bgCloseModal="bg-gray-100"
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            buttonOpenModal={
              <Button
                className="w-full h-full rounded-lg bg-theme-default font-semibold text-white"
                title="Salvar"
                onClick={() => setIsModalOpen(true)}
              >
                Salvar
              </Button>
            }
          />
        </div>
      }
    >
      <form className="mt-7.5 pb-14 gap-3.5 w-full h-full overflow-y-auto flex flex-col items-center justify-between">
        {!token && (
          <>
            <div className="w-32.5 h-32.5">
              <Image
                priority
                src="/producer.jpeg"
                alt="User"
                width={130}
                height={130}
                className="rounded-full border border-theme-default object-none object-top aspect-square grayscale cursor-not-allowed"
              />
            </div>
            <div className="w-full flex flex-col items-center justify-center gap-5">
              <Input
                register={{ ...register("first_name") }}
                placeholder="Primeiro nome"
                label="Nome"
                type="text"
              />
              <Input
                register={{ ...register("last_name") }}
                placeholder="Sobrenome"
                label="Sobrenome"
                type="text"
              />
              <Input
                register={{ ...register("email") }}
                placeholder="E-mail"
                label="E-mail"
                type="email"
                className="cursor-not-allowed text-gray-400"
                disabled={true}
              />
              <Input
                register={{ ...register("phone") }}
                placeholder="Celular"
                label="Celular"
                type="text"
              />
            </div>
            <hr className="w-37.5 mt-7 mb-2.5 bg-french-gray h-px" />
            <h3 className="text-xl leading-7.5 font-medium text-theme-home-bg">
              Informações comerciais
            </h3>
            <div className="w-full flex flex-col items-center justify-center gap-5">
              <Input
                placeholder="Nome comercial"
                label="Nome comercial"
                type="text"
                disabled
                className="cursor-not-allowed text-gray-400"
              />
              <Input
                placeholder="Número do Talão"
                label="Número do Talão"
                type="text"
                disabled
                className="cursor-not-allowed text-gray-400"
              />
              <div className="w-full h-full relative flex flex-col text-slate-gray">
                <label className="text-sm leading-4.75 font-inter font-normal text-theme-primary pb-1.75 flex flex-row items-center justify-start gap-2 tracking-tight-2">
                  Descrição
                </label>
                <textarea
                  maxLength={200}
                  value="Elit ipsum deserunt elit exercitation voluptate deserunt quis sunt proident. Est adipisicing proident cillum ad. Ad in sint elit consectetur duis voluptate fugiat. In ex cillum et ipsum magna sint cillum eiusmod non occaecat minim veniam adipisicing. Aliqua ullamco magna labore ex quis voluptate ea occaecat."
                  className="w-full p-3 border border-theme-primary rounded-lg font-inter font-normal box-border h-56 cursor-not-allowed text-gray-400 resize-none"
                  disabled
                />
              </div>
              <div className="relative flex flex-col text-slate-gray w-full">
                <label className="text-sm leading-4.75 font-inter font-normal text-theme-primary pb-1.75 flex flex-row items-center justify-start gap-2 tracking-tight-2">
                  Selecione até 4 fotos
                </label>
                <div className="w-full flex flex-row justify-start items-center flex-wrap gap-3.25">
                  <Image
                    priority
                    src="/producer.jpeg"
                    alt="User"
                    width={130}
                    height={130}
                    className="rounded-lg w-18 border border-theme-default object-contain object-top aspect-square grayscale cursor-not-allowed"
                  />
                  <Image
                    priority
                    src="/producer.jpeg"
                    alt="User"
                    width={130}
                    height={130}
                    className="rounded-lg w-18 border border-theme-default object-contain object-top aspect-square grayscale cursor-not-allowed"
                  />
                  <Image
                    priority
                    src="/producer.jpeg"
                    alt="User"
                    width={130}
                    height={130}
                    className="rounded-lg w-18 border border-theme-default object-contain object-top aspect-square grayscale cursor-not-allowed"
                  />
                  <Image
                    priority
                    src="/producer.jpeg"
                    alt="User"
                    width={130}
                    height={130}
                    className="rounded-lg w-18 border border-theme-default object-contain object-top aspect-square grayscale cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
          </>
        )}
        {token && (
          <>
            <Input
              register={{ ...register("password") }}
              placeholder="Digite sua senha"
              label="Nova senha"
              icon={<AiOutlineEye />}
              type="password"
            />
            <Input
              register={{ ...register("confirmPassword") }}
              placeholder="Digite sua senha"
              label="Confirmar senha"
              icon={<AiOutlineEye />}
              type="password"
            />
          </>
        )}
      </form>
    </ModelPage>
  );
}
