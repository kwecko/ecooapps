import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

interface ModalProps {
  titleOpenModal?: string
  titleContentModal?: string
  subtitleContentModal?: string
  contentModal?: string
  titleConfirmModal?: string
  titleCloseModal?: string
  textCloseModal?: string
  bgOpenModal?: string
  bgConfirmModal?: string
  bgCloseModal?: string
  buttonOpenModal?: React.ReactNode
  isOpen?: boolean
  setIsOpen?: (value: boolean) => void
  rejectAction?: () => void
  approveAction?: () => void
}

export default function CustomModal({
  titleOpenModal,
  titleContentModal,
  subtitleContentModal,
  contentModal,
  titleConfirmModal,
  titleCloseModal,
  textCloseModal,
  bgOpenModal,
  bgConfirmModal,
  bgCloseModal,
  buttonOpenModal,
  isOpen: externalIsOpen,
  setIsOpen: externalSetIsOpen,
  rejectAction,
  approveAction,
}: ModalProps) {

  const [internalIsOpen, setInternalIsOpen] = useState(false);

  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const setIsOpen = externalSetIsOpen !== undefined ? externalSetIsOpen : setInternalIsOpen;

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const handleRejectActionModal = () => {
    if (rejectAction) rejectAction();
    closeModal();
  };

  const handleApproveActionModal = () => {
    if (approveAction) approveAction();
    closeModal();
  };

  return (
    <>
      {buttonOpenModal ? (
        <button
          type="button"
          onClick={openModal}
        >
          {buttonOpenModal}
        </button>
      ) : (
        <div className="w-full flex">
          <button
            style={{ backgroundColor: bgOpenModal }}
            type="button"
            onClick={openModal}
            className={`rounded-md px-3 py-4 font-medium text-white w-full`}
          >
            {titleOpenModal}
          </button>
        </div>
      )
      }
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xs transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all relative">
                  
                <div className="h-7">
                    <button
                      className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                      onClick={closeModal}
                    >
                      <AiOutlineClose className="w-7 h-7"/>
                    </button>
                  </div>

                  <Dialog.Title
                    as="h3"
                    className="text-2xl text-center font-medium leading-6 text-slate-gray"
                  >
                    {titleContentModal}
                  </Dialog.Title>
                  <Dialog.Title
                    as="h3"
                    className="text-center text-theme-primary mt-2"
                  >
                    {subtitleContentModal}
                  </Dialog.Title>
                  <div className="mt-6 mb-6">
                    <p className="text-center text-theme-primary">
                      {contentModal}
                    </p>
                  </div>

                  <div className="flex justify-center gap-3 mt-8">
                    {rejectAction ? (
                      <button
                        style={{ backgroundColor: bgCloseModal, color: textCloseModal }}
                        type="button"
                        className={`w-full inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-3 font-medium`}
                        onClick={handleRejectActionModal}
                      >
                        {titleCloseModal}
                      </button>
                    ) : null}
                    {approveAction ? (
                      <button
                      style={{ backgroundColor: bgConfirmModal }}
                      type="button"
                      className={`w-full text-white inline-flex justify-center rounded-md border border-transparent px-4 py-3 font-medium focusable-button`}
                      onClick={handleApproveActionModal}
                    >
                      {titleConfirmModal}
                    </button>
                    ) : null}
                    {!rejectAction && !approveAction && (
                      <button
                        type="button"
                        className={`w-full bg-[#EAE7E3] text-theme-primary inline-flex justify-center rounded-md border border-transparent px-4 py-3 font-medium focusable-button`}
                        onClick={closeModal}
                      >
                        Ok
                      </button>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}