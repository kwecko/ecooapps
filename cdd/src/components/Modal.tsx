import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

interface ModalProps {
  titleOpenModal?: string
  titleContentModal?: string
  contentModal?: string
  titleConfirmModal?: string
  titleCloseModal?: string
  bgOpenModal?: string
  bgConfirmModal?: string
  bgCloseModal?: string
  modalAction?: () => void
}

export default function Modal({ 
  titleOpenModal, 
  titleContentModal, 
  contentModal, 
  titleConfirmModal,
  titleCloseModal,
  bgOpenModal, 
  bgConfirmModal, 
  bgCloseModal,
  modalAction 
}: ModalProps) {
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const handleActionModal = () => {
    closeModal();
    if (modalAction) modalAction();
  };

  return (
    <>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg text-center font-medium leading-6 text-slate-gray"
                  >
                    {titleContentModal}
                  </Dialog.Title>
                  <div className="mt-8 mb-8">
                    <p className="text-center text-theme-primary">
                      {contentModal}
                    </p>
                  </div>

                  <div className="flex justify-center gap-3 mt-4">
                    <button
                      style={{ backgroundColor: bgCloseModal }}
                      type="button"
                      className={`w-full text-[#455154] inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-3 py-4 font-medium`}
                      onClick={closeModal}
                    >
                      {titleCloseModal}
                    </button>
                    <button
                      style={{ backgroundColor: bgConfirmModal }}
                      type="button"
                      className={`w-full text-white inline-flex justify-center rounded-md border border-transparent px-3 py-4 font-medium`}
                      onClick={handleActionModal}
                    >
                      {titleConfirmModal}
                    </button>
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
