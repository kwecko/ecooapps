"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { HiOutlineInformationCircle } from "react-icons/hi";
import { AiOutlineEye } from "react-icons/ai";
import { Tooltip } from "antd";
import { toast } from "sonner";

import { useLocalStorage } from "@shared/hooks/useLocalStorage";
import { useHandleError } from "@shared/hooks/useHandleError";
import { getUser } from "@shared/_actions/account/get-user";
import { updateUser } from "@shared/_actions/account/update-user";

import Modal from "@shared/components/Modal";
import NewInput from "@shared/components/NewInput";
import Button from "@shared/components/Button";

import { schemaChangePassword } from "./schemas";
import { IUser } from "./interface";

export default function AlterarCadastro() {
  const { handleError } = useHandleError();
  const { getFromStorage } = useLocalStorage();
  const passwordRequirements = "Sua senha deve ter pelo menos 8 caracteres.";

  const [user, setUser] = useState<IUser>({} as IUser);

  useEffect(() => {
    (async () => {
      await getUser()
        .then((response) => {
          if (response.message) {
            const messageError = response.message;
            handleError(messageError);
            return;
          }

          setUser(response.data);
        })
        .catch((error) => {
          toast.error(error);
        });
    })();
  }, []);

  const fetchData = async (data: IUser) => {
    const storedData = getFromStorage("register-form-data");
    if (storedData) {
      const updatedData = { ...data, ...storedData };
      data = updatedData;
    }
    return data;
  };

  const handleSubmit = async (data: IUser) => {

    data = await fetchData(data);
    console.log(data);

    if (!data.password || !data.confirmPassword) {
      toast.error("Preencha os campos * obrigatórios.");
      return;
    }

    const validation = schemaChangePassword.safeParse(data);

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
        <div className="w-full h-[85vh] flex flex-col mt-10">
          <form
            className="w-full h-full flex flex-col justify-between"
          >
            <div className="w-full flex flex-col gap-2">
              <NewInput
                name="first_name"
                placeholder="Primeiro nome"
                label="Nome"
                type="text"
                defaultValue={user?.first_name}
                localStorageFormKey="register-form-data"
              />
              <NewInput
                name="last_name"
                placeholder="Sobrenome"
                label="Sobrenome"
                type="text"
                defaultValue={user?.last_name}
                localStorageFormKey="register-form-data"
              />
              <NewInput
                name="email"
                placeholder="E-mail"
                label="Email"
                type="email"
                defaultValue={user?.email}
                className="cursor-not-allowed text-gray-400"
                disabled={true}
              />
              <NewInput
                name="phone"
                placeholder="Telefone"
                label="Telefone"
                type="number"
                defaultValue={user?.phone}
                localStorageFormKey="register-form-data"
              />
              <NewInput
                name="password"
                placeholder="Digite sua senha"
                label={
                  (
                    <span className="flex gap-1 items-center">
                      Nova senha *
                      <Tooltip title={passwordRequirements}>
                        <HiOutlineInformationCircle className="text-theme-default" />
                      </Tooltip>
                    </span>
                  ) as unknown as Element
                }
                icon={<AiOutlineEye />}
                type="password"
                defaultValue={user?.password}
                localStorageFormKey="register-form-data"
              />
              <NewInput
                name="confirmPassword"
                placeholder="Confirme sua senha"
                label={
                  (
                    <span className="flex gap-1 items-center">
                      Confirmar senha *
                      <Tooltip title={passwordRequirements}>
                        <HiOutlineInformationCircle className="text-theme-default" />
                      </Tooltip>
                    </span>
                  ) as unknown as Element
                }
                icon={<AiOutlineEye />}
                type="password"
                defaultValue={user?.confirmPassword}
                localStorageFormKey="register-form-data"
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
                bgOpenModal="#2F4A4D"
                bgConfirmModal="#2F4A4D"
                bgCloseModal="bg-gray-100"
                modalAction={() =>
                handleSubmit(user)
              }
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
