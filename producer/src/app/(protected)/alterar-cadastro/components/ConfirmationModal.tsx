import React, { ReactNode } from "react";
import Modal from "./Modal";
import { ModalProps } from "./ModalProps";
import { ConfirmationModalProps } from "./ConfirmationModalProps";

export default function ConfirmationModal({
  info,
  openButton,
  link,
}: ConfirmationModalProps) {
  return (
    <Modal
      info={info}
      openButton={openButton}
      title="Você tem certeza?"
      description="Confirme seus dados, após clicar em salvar eles serão atualizados."
      approvalButtons={true}
      textButton1="Cancelar"  
      textButton2="Confirmar"
      bgButton2="#ffffff"
      link2={link}
    />
  );
}