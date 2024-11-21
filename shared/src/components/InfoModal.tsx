import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

interface InfoModalProps {
  titleContentModal: string;
  contentModal: string | JSX.Element;
  icon: React.ReactNode | string;
  titleCloseModal: string;
  buttonOpenModal: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  modalAction?: () => void;
}

export default function InfoModal({
  titleContentModal,
  contentModal,
  icon = "?",
  titleCloseModal,
  buttonOpenModal,
  isOpen,
  setIsOpen,
  modalAction,
}: InfoModalProps) {
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      {buttonOpenModal}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-7.5 text-center relative">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform rounded-2xl bg-white p-3.75 text-left align-middle shadow-xl transition-all flex flex-col gap-2 items-stretch">
                  <div className="absolute w-12.5 h-12.5 bg-theme-default rounded-full -top-6 z-10 overflow-visible flex items-center justify-center text-white text-3xl leading-5.5 font-normal self-center">
                    {icon}
                  </div>
                  <Dialog.Title
                    as="h3"
                    className="px-3.75 pt-9 text-xl text-left font-semibold leading-5.5 text-slate-gray"
                  >
                    {titleContentModal}
                  </Dialog.Title>
                  <div className="">
                    <p className="px-3.5 pt-1 text-left text-theme-primary text-xs leading-5 font-inter font-normal tracking-tigher">
                      {contentModal}
                    </p>
                  </div>
                  <div className="flex justify-center gap-3 pt-9">
                    <button
                      type="button"
                      className={`w-full text-white justify-center rounded-md border border-transparent bg-rain-forest px-3 py-4 font-semibold h-12 flex items-center font-inter text-base leading-5.5 tracking-tight-2`}
                      onClick={closeModal}
                    >
                      {titleCloseModal}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
