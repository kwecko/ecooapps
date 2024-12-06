import React from "react";
import { IoMdClose } from "react-icons/io";

import Modal from "react-modal";

import { twMerge } from "tailwind-merge";

interface ModalV2Props {
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
  className?: string;
  title: string;
}

function ModalV2({
  isOpen,
  closeModal,
  children,
  className,
  title,
}: ModalV2Props) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      overlayClassName="fixed z-10 inset-0 bg-black/50 flex items-center justify-center"
      className={twMerge(
        "w-full max-w-lg max-h-95dvh bg-theme-background p-10 rounded-2xl relative m-2 overflow-y-auto inline-block",
        className
      )}
      closeTimeoutMS={200}
      ariaHideApp={false}
    >
      <div className="relative mb-5">
        <h1 className="text-center pt-5 font-semibold text-xl text-text-heading">
          {title}
        </h1>
        <button className="absolute top-0 right-0" onClick={closeModal}>
          <IoMdClose size={20} className="text-table-primary" />
        </button>
      </div>
      {children}
    </Modal>
  );
}

export default ModalV2;
