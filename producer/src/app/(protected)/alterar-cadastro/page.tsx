"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { AiOutlineEye } from "react-icons/ai";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useHandleError } from "@shared/hooks/useHandleError";
import { getUser } from "@shared/_actions/account/get-user";
import { updateUser } from "@shared/_actions/account/update-user";

import Modal from "@shared/components/Modal";
import Input from "@shared/components/Input";
import Button from "@shared/components/Button";

import { formSchema } from "./schemas";
import { IUser } from "./interface";

export default function AlterarCadastro() {
  const { handleError } = useHandleError();
  const { register, handleSubmit, reset } = useForm<IUser>();

  useEffect(() => {
    (async () => {
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
  }, []);

  const handleSubmitForm = async (data: IUser) => {

    const validation = formSchema.safeParse(data);

    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }

    await updateUser(data)
      .then((response) => {
        if (response?.message) {
          handleError(response.message);
          return;
        }

        toast.success("Cadastro atualizado com sucesso!");
        localStorage.removeItem("register-form-data");
        window.location.href = "/";
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <>
      <div
        className="w-full h-screen p-5 flex items-center flex-col bg-theme-background"
      >
        <div className="flex flex-col w-full items-center justify-end">
          <h1 className="text-3xl font-medium text-slate-gray">Seu perfil</h1>
          <span className="text-sm font-medium text-slate-gray text-center mt-2">
            Após atualizar os seus dados, <br /> clique em salvar.
          </span>
        </div>
        <div className="w-full h-full flex flex-col mt-10">
          <form
            id="alterar-cadastro-form"
            className="w-full h-full flex flex-col justify-between"
          >
            <div className="w-full flex flex-col gap-4">
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
                type="number"
              />
              <Input
                register={{...register("password")}}
                placeholder="Digite sua senha"
                label="Nova senha"
                icon={<AiOutlineEye />}
                type="password"
              />
              <Input
                register={{...register("confirmPassword")}}
                placeholder="Confirme sua senha"
                label="Confirmar senha"
                icon={<AiOutlineEye />}
                type="password"
              />
            </div>

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
          </form>
        </div>
      </div>
    </>
  );
}
