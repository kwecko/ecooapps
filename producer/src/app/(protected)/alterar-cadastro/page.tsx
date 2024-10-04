"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { AiOutlineEye } from "react-icons/ai";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

import { useHandleError } from "@shared/hooks/useHandleError";
import { getUser } from "@shared/_actions/account/get-user";
import { updateUser } from "@shared/_actions/account/update-user";

import Modal from "@shared/components/Modal";
import Input from "@shared/components/Input";
import Button from "@shared/components/Button";

import { IUserUpdate } from "@shared/interfaces/user-interface";
import { ModelPage } from "@shared/components/ModelPage";

export default function AlterarCadastro() {
  const { handleError } = useHandleError();
  const { register, handleSubmit, reset } = useForm<IUserUpdate>();

  useEffect(() => {
    (async () => {
      await getUser()
        .then((response) => {
          if (response.message) {
            const messageError = response.message;
            handleError(messageError);
            return;
          }
          const { first_name, last_name, email, phone } = response.data;
          const data = { first_name, last_name, email, phone };
          reset(data);
        })
        .catch((error) => {
          toast.error(error);
        });
    })();
  }, []);

  const handleSubmitForm = async (data: IUserUpdate) => {
    Object.keys(data).forEach((key) => {
      if (!data[key as keyof IUserUpdate]) {
        delete data[key as keyof IUserUpdate];
      }
    });
    
    if (data.password && data.password.length < 8) {
      toast.error("Senha deve ter pelo menos 8 caracteres.");
      return;
    }

    if (data.phone && data.phone.length < 11) {
      toast.error("Formato de telefone inválido.");
      return;
    }

    await updateUser(data)
      .then((response) => {
        if (response?.message) {
          handleError(response.message);
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
      title="Seu perfil"
      titleClassName="gap-5"
        subtitle={`Após atualizar os seus dados, clique em salvar.`}
      subtitleClassName="px-3"
      buttonArea={
        <div className="w-full p-5 flex gap-4 z-10 px-2 py-1 pb-5 bg-transparent">
          <Link className="w-full" href={"/"}>
            <Button className="w-full rounded-lg bg-white font-semibold text-slate-gray border-slate-gray border-2 py-4 hover:bg-gray-100">
              Voltar
            </Button>
          </Link>
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
          />
        </div>
      }
    >
      <form
        className="w-full h-full flex flex-col justify-between"
      >
        <div className="w-full flex flex-col gap-12 mt-4">
          <Input
            register={{...register("first_name")}}
            placeholder="Primeiro nome"
            label="Nome"
            type="text"
          />
          <Input
            register={{...register("last_name")}}
            placeholder="Sobrenome"
            label="Sobrenome"
            type="text"
          />
          <Input
            register={{...register("email")}}
            placeholder="E-mail"
            label="Email"
            type="email"
            className="cursor-not-allowed text-gray-400"
            disabled={true}
          />
          <Input
            register={{...register("phone")}}
            placeholder="Telefone"
            label="Telefone"
            type="text"
          />
          <Input
            register={{...register("password")}}
            placeholder="Digite sua senha"
            label="Nova senha"
            icon={<AiOutlineEye />}
            type="password"
          />
        </div>
      </form>
    </ModelPage>
  );
}
