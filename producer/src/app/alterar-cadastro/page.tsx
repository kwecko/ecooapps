"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import Button from "@shared/components/Button";
import Modal from "@shared/components/Modal";
import { ModelPage } from "@shared/components/ModelPage";

import { ChangePasswordForm } from "./components";

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
      title="Recuperar senha"
      titleClassName="pt-17"
      titleGap="gap-2.5"
      subtitle={`Após atualizar os seus dados, clique em salvar.`}
      subtitleClassName="px-9 leading-5.5"
      buttonArea={
        <div className="w-full flex gap-2 bg-transparent h-11">
          <Modal
            titleContentModal="Você tem certeza?"
            contentModal="Ao clicar em confirmar seus dados de cadastro serão atualizados."
            titleCloseModal="Cancelar"
            titleConfirmModal="Confirmar"
            modalAction={handleModalAction}
            bgConfirmModal="#00735E"
            bgCloseModal="bg-gray-100"
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            buttonOpenModal={
              <Button
                className="w-full h-full rounded-lg font-semibold text-white bg-theme-default"
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
    </ModelPage>
  );
}
