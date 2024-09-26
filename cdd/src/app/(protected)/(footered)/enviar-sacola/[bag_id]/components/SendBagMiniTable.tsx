'use client'

import { toast } from "sonner";
import { useEffect, useState, Fragment } from "react";
import { notFound, useParams, useRouter } from "next/navigation";
import { fetchBag } from "@cdd/app/_actions/bag/fetch-bag";
import { handleBag } from "@cdd/app/_actions/bag/handle-bag";

import Modal from "@shared/components/Modal";
import { BagOrder } from "@shared/interfaces/bag-order"
import TableSkeleton from "@shared/components/TableSkeleton";
import { useHandleError } from "@shared/hooks/useHandleError";
import { getNextSaturdayDate } from "@shared/utils/get-next-saturday-date";
import { convertUnit } from "@shared/utils/convert-unit";
import { Listbox, Transition } from "@headlessui/react";
import { LuChevronsUpDown } from "react-icons/lu";
import { FaCheck } from "react-icons/fa6";
import { set } from "react-hook-form";

export default function SendBagMiniTable() {
  const router = useRouter()

  const [bagOrder, setBagOrder] = useState<BagOrder | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { handleError } = useHandleError()

  const { bag_id } = useParams();

  if (!bag_id) {
    notFound()
  }

  useEffect(() => {
    (() => {
      setIsLoading(true)
      fetchBag({
        bag_id: bag_id as string
      })
        .then((response) => {
          if (response.message) {
            const messageError = response.message as string

            handleError(messageError)
          } else if (response.data) {
            setBagOrder(response.data)
            setIsLoading(false)
            return;
          }
        })
        .catch(() => {
          toast.error("Erro desconhecido.")
        })
    })()
  }, [bag_id]);
  
  const handleStatusBag = async (bag_id: string, status: "SEPARATED") => {
    handleBag({
      bag_id,
      status: "DISPATCHED"
    })
      .then((response) => {
        if (response.message) {
          const messageError = response.message as string

          handleError(messageError)
        } else {
          sessionStorage.setItem(
            "data-sucess",
            JSON.stringify({
              title: "A oferta foi Reprovada!",
              description: "A sacola do cliente foi enviada.",
              button: {
                secundary: "/",
                primary: "/enviar-sacola",
              },
            })
          );
          router.push(`/success`);
          return;
        }
      })
      .catch(() => {
        toast.error("Erro desconhecido.")
      })
  }

  const [bagStatus, setBagStatus] = useState(bagOrder?.status);

  const bagStatusOptions = [
    { value: 'DISPATCHED', label: 'Enviada' },
    { value: 'DELIVERED', label: 'Entregue' },
    { value: 'RETURNED', label: 'Retornada' },
  ];

  return (
    <>
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <div className="w-full h-full flex flex-col justify-between">
          <div className="max-w-sm mx-auto bg-white rounded-lg">
            <div className="flex gap-10 items-start text-theme-primary border-b-[1px] border-theme-background p-3">
              <span className="w-1/5">Pedido:</span>
              <span className="w-4/5">{bagOrder?.id}</span>
            </div>
            <div className="flex gap-10 items-center text-theme-primary border-b-[1px] border-theme-background p-3">
              <span className="w-1/5 flex items-center">Status:</span>
              <div className="w-4/5 relative">
                <Listbox
                  value={bagStatus}
                  onChange={(value) => {
                    setBagStatus(value);
                    setBagOrder((prev) => prev ? { ...prev, status: value } : null);
                  }}
                >
                  {({ open }) => (
                    <>
                      <div className="relative z-10">
                        <Listbox.Button
                          className={`ring-1 ring-slate-blue relative w-full py-3 cursor-default outline-none bg-white pl-3 pr-10 text-left rounded-lg ${
                            open ? 'ring-2 ring-slate-gray bg-theme-background' : ''
                          }`}
                        >
                          <span className="block truncate text-slate-gray w-full">
                            {bagStatusOptions.find(
                              (option) => option.value === bagOrder?.status
                            )?.label ?? 'Selecione um status'}
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <LuChevronsUpDown
                              className="h-5 w-5 text-slate-gray"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options
                            className="absolute z-0 max-h-60 w-full overflow-auto bg-white text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                            style={{
                              marginTop: -13,
                              zIndex: -1,
                            }}>
                            <div className="h-4 bg-transparent" />
                            {bagStatusOptions.map((option) => (
                              <Listbox.Option
                                key={option.value}
                                className={({ selected }) =>
                                  `relative cursor-default select-none py-3 pl-10 pr-4 ${
                                    selected
                                      ? 'text-slate-gray bg-theme-background'
                                      : 'bg-white'
                                  }`
                                }
                                value={option.value}
                              >
                                {({ selected }) => (
                                  <>
                                    <span className="block truncate text-slate-gray">
                                      {option.label}
                                    </span>
                                    {selected && (
                                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 bg-theme-background">
                                        <FaCheck
                                          className="h-4 w-4 text-slate-gray"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    )}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </>
                  )}
                </Listbox>
              </div>
            </div>
            <div className="flex gap-10 items-start text-theme-primary border-b-[1px] border-theme-background p-3">
              <span className="w-1/5">Cliente:</span>
              <span className="w-4/5">{`${bagOrder?.user.first_name} ${bagOrder?.user.last_name}`}</span>
            </div>
            <div className="flex gap-10 items-start text-theme-primary border-b-[1px] border-theme-background p-3">
              <span className="w-1/5">Prazo:</span>
              <span className="w-4/5">{getNextSaturdayDate()}</span>
            </div>
            <div className="text-theme-primary p-3">Conteúdo:</div>
            <div className="pl-3 pb-3 text-theme-primary">
              {bagOrder?.orders.map(order => (
                <div key={order.id}>
                  {`${order.amount}${convertUnit(order.offer.product.pricing)} - ${order.offer.product.name}`}
                </div>
              ))}
            </div>
          </div>
          <div className="w-full h-[10%] flex justify-center items-end">
            {bagOrder?.status === "SEPARATED" ? (
              <Modal
                titleOpenModal="Marcar como enviada"
                titleContentModal="Você tem certeza?"
                contentModal="Ao alterar o status para enviada, o cliente será notificado que ela está a caminho."
                bgOpenModal="#00735E"
                titleCloseModal="Cancelar"
                titleConfirmModal="Confirmar"
                bgConfirmModal="#00735E"
                bgCloseModal="#EEF1F4"
                modalAction={() => {
                  handleStatusBag(bagOrder.id, "SEPARATED")
                }}
              />
            ) : (
              <>
                <span className="text-center mt-6 text-slate-gray">Sacola já enviada!</span>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
