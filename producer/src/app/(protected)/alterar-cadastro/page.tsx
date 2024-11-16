"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import Button from "@shared/components/Button";
import Modal from "@shared/components/Modal";
import { ModelPage } from "@shared/components/ModelPage";

import { ChangePasswordForm, ChangeRegistrationForm } from "./components";

export default function AlterarCadastro() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [isModalOpen, setIsModalOpen] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (formRef.current) {
      setIsFormValid(formRef.current.checkValidity());
    }
  });

  const handleModalAction = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
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
            modalAction={handleModalAction}
            bgOpenModal="#2F4A4D"
            bgConfirmModal="#2F4A4D"
            bgCloseModal="bg-gray-100"
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            buttonOpenModal={
              <Button
                className="w-full h-full rounded-lg bg-theme-default font-semibold text-white"
                title="Salvar"
                disabled={!isFormValid}
                onClick={() => setIsModalOpen(true)}
              >
                Salvar
              </Button>
            }
          />
        </div>
      }
    >
      {token && <ChangePasswordForm token={token} ref={formRef} />}
      {!token && <ChangeRegistrationForm ref={formRef} />}
    </ModelPage>
  );
}
