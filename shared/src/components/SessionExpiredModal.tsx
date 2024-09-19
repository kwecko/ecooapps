import { useSessionExpiredContext } from '../context/session/index'
import { Dialog, Transition } from '@headlessui/react'
import { useRouter } from 'next/navigation'
import { Fragment } from 'react'

interface ModalProps {
  titleContentModal?: string
  contentModal?: string
  buttonLabel?: string
  bgButton?: string
}

export default function SessionExpiredModal({
  titleContentModal,
  contentModal,
  buttonLabel,
  bgButton,
}: ModalProps) {
  const router = useRouter()

  const { sessionExpired, setSessionExpired } = useSessionExpiredContext()

  const handleClickButton = () => {
    router.push('/api/auth/logout')
    setSessionExpired(false)
  }

  return (
    <Transition appear show={sessionExpired} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => { }}>
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

                <div className="flex justify-center mt-4">
                  <button
                    style={{ backgroundColor: bgButton }}
                    type="button"
                    className={`w-full text-white inline-flex justify-center rounded-md border border-transparent px-3 py-4 font-medium focus:border-slate-gray`}
                    onClick={handleClickButton}
                  >
                    {buttonLabel}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
