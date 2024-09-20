"use client";
import { ReactNode, useState } from "react";
import { Dialog, FocusTrap } from "@headlessui/react";
import Link from "next/link";
import UpdateAccountInfoButton from "./UpdateAccountInfoButton";
import { StatusContent } from "./StatusContent";
import { ModalProps } from "./ModalProps";

export default function Modal({
  info,
  openButton,
  title,
  description,
  approvalButtons,
  textButton1,
  textButton2,
  bgButton2,
  link2,
  button2,
}: ModalProps) {
  let [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div
        className={`cursor-pointer w-full h-10 flex justify-center items-center bg-[${bgButton2}] rounded-md text-white font-semibold font-inter`}
        aria-label="Abrir Modal"
        onClick={openModal}
      >
        {openButton}
      </div>
      <Dialog
        as="div"
        open={isOpen}
        onClose={closeModal}
        className="fixed inset-10 h-fit overflow-y-auto text-center"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div
          className="fixed grid place-items-center inset-0"
          aria-hidden="true"
        >
          <Dialog.Panel className="bg-white z-10 rounded-3xl w-[83.35%] max-w-[300px] min-h-[300px] flex flex-col justify-between align-center px-4 py-7">
            <Dialog.Title>
              <div
                className={`font-semibold text-2xl mt-5 leading-5 max-h-[25px] text-[20px] text-slate-gray
                font-poppins
                `}
              >
                {title}
              </div>
            </Dialog.Title>
            <Dialog.Description className="text-theme-primary text-[15.67px] max-w-[241px] min-h-[100px] font-normal font-inter leading-5 overflow-y-auto self-center">
              {description}
            </Dialog.Description>
            {approvalButtons && (

              <FocusTrap>
                <div className="gap-2 flex flex-row justify-stretch items-center w-full font-inter font-semibold text-[15.67px]">
                  <button
                    onClick={closeModal}
                    className="w-full rounded-lg font-semibold text-slate-gray border-slate-gray border-2 py-2.5"
                  >
                    {textButton1}
                  </button>

                  {button2 ? (
                    <div className="w-full h-[inherit]">{button2}</div>
                  ) : (
                    <Link
                      href={link2}
                      className={`w-full h-[inherit] bg-[${bgButton2}] rounded-md text-white flex justify-center items-center`}
                    >
                      <UpdateAccountInfoButton
                        firstName={info.firstName}
                        lastName={info.lastName}
                        phone={info.phone}
                        password={info.password}
                        email={info.email}
                        cpf={info.cpf}
                      />
                    </Link>
                  )}
                </div>
              </FocusTrap>
            )}
          <button
            onClick={closeModal}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            &times;
          </button>
        </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
