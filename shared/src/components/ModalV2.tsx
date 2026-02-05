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
  iconClose?: boolean;
}

function ModalV2({
  isOpen,
  closeModal,
  children,
  className,
  title,
  iconClose = false,
}: ModalV2Props) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      overlayClassName="fixed z-10 inset-0 bg-black/50 flex items-center justify-center"
      className={twMerge(
        "w-full max-w-lg max-h-95dvh bg-theme-background p-10 rounded-2xl relative m-2 overflow-hidden inline-block flex flex-col",
        className
      )}
      closeTimeoutMS={200}
      ariaHideApp={false}
    >
      <div className="relative mb-3 flex-shrink-0">
        <h1
          className={twMerge(
            "text-center font-semibold text-xl text-text-heading",
            !iconClose && "pt-5"
          )}
        >
          {title}
        </h1>
        {!iconClose && (
          <button className="absolute top-0 right-0" onClick={closeModal}>
            <IoMdClose size={20} className="text-table-primary" />
          </button>
        )}
      </div>
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </Modal>
  );
}

export default ModalV2;
