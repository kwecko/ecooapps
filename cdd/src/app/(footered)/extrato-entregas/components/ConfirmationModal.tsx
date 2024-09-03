import React, { ReactNode } from "react";
import Modal from "@cdd/components/Modalll";

interface ConfirmationModalProps {
  openButton: ReactNode;
  link: string;
}

export default function ConfirmationModal({
  openButton,
  link,
}: ConfirmationModalProps) {
  return (
    <Modal
      openButton={openButton}
      title="Imprimir extrato"
      description="Faça a impressao do extrato para a entrega dos motoboy"
      approvalButtons={true}
      textButton1="Cancelar"
      textButton2="Imprimir"
      bgButton2="#00735E"
    />
  );
}