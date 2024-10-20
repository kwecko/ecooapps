'use client'

import { useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { notFound, useParams, useRouter } from "next/navigation";
import { LuChevronsUpDown } from "react-icons/lu";
import { FaCheck } from "react-icons/fa6";
import { toast } from "sonner";

import { fetchBag } from "@cdd/app/_actions/bag/fetch-bag";
import { handleBag } from "@cdd/app/_actions/bag/handle-bag";

import Modal from "@shared/components/Modal";
import TableSkeleton from "@shared/components/TableSkeleton";

import { BagOrder } from "@shared/interfaces/bag-order"
import { useHandleError } from "@shared/hooks/useHandleError";

import convertStatus from "@shared/utils/convert-status";
import { getNextSaturdayDate } from "@shared/utils/get-next-saturday-date";
import { convertUnit } from "@shared/utils/convert-unit";
import GroupOrder from "@shared/components/GroupOrder";

export default function SendBagMiniTable() {
  const router = useRouter()

  type IStatus = "SEPARATED" | "DISPATCHED" | "RECEIVED" | "DEFERRED" | "PENDING";

  const [bagOrder, setBagOrder] = useState<BagOrder | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [bagStatus, setBagStatus] = useState<string | undefined>(undefined);
  const [currentStatus, setCurrentStatus] = useState<string | undefined>(undefined);
  const [isStatusChanged, setIsStatusChanged] = useState(false);

  const bagStatusOptions = [
    { value: 'DISPATCHED', label: 'Enviada' },
    { value: 'RECEIVED', label: 'Entregue' },
    { value: 'DEFERRED', label: 'Retornada' },
  ];

  const { handleError } = useHandleError()

  const { bag_id } = useParams();

  if (!bag_id) {
    notFound()
  }

  useEffect(() => {
    (async () => {
      setIsLoading(true)
      try {
        const response = await fetchBag({ bag_id: bag_id as string });
        if (response.message) {
          const messageError = response.message as string;
          handleError(messageError);
        } else if (response.data) {
          setBagOrder(response.data);
          setCurrentStatus(response.data.status);
          setBagStatus(response.data.status);
        }
      } catch (error) {
        toast.error("Erro desconhecido.");
      } finally {
        setIsLoading(false);
      }
    })();
  }, [bag_id]);

  const handleStatusBag = (bag_id: string) => {
    handleBag({
      bag_id,
      status: "DISPATCHED",
    }).then(response => {
      if (response.message) {
        const messageError = response.message as string;
        handleError(messageError);
      } else {
        sessionStorage.setItem(
          "data-sucess",
          JSON.stringify({
            title: "A oferta foi enviada!",
            description: "A sacola está a caminho do cliente.",
            button: {
              secondary: {
                router: "/",
                name: "Voltar para a tela inicial",
              },
              primary: {
                router: "/enviar-sacola",
                name: "Enviar outra sacola",
              },
            },
          })
        );
        router.push(`/sucesso`);
      }
    }).catch(() => {
      toast.error("Erro desconhecido.");
    });
  }

  const handleNewStatus = (bag_id: string, status: IStatus) => {
    handleBag({
      bag_id,
      status
    }).then(response => {
      if (response.message) {
        const messageError = response.message as string;
        handleError(messageError);
      } else {
        const statusName = status === "RECEIVED" ? "entregue" : status === "DEFERRED" ? "retornada" : "enviada";
        sessionStorage.setItem(
          "data-sucess",
          JSON.stringify({
            title: `A oferta foi ${statusName}!`,
            description: `A sacola do cliente foi ${statusName}.`,
            button: {
              secondary: {
                router: "/",
                name: "Voltar para a tela inicial",
              },
              primary: {
                router: "/enviar-sacola",
                name: "Enviar outra sacola",
              },
            },
          })
        );
        router.push(`/sucesso`);
      }
    }).catch(() => {
      toast.error("Erro desconhecido.");
    });
  }

  return (
    <>
      {isLoading ? (
        <TableSkeleton />
      ) : bagOrder ? (
        <div className="w-full h-full flex flex-col justify-between">
          <div className="max-w-sm mx-auto bg-white rounded-lg">
            <div className="flex gap-10 items-start text-theme-primary border-b border-theme-background p-3">
              <span className="w-1/5">Pedido:</span>
              <span className="w-4/5">{bagOrder.id}</span>
            </div>
            <div className="flex gap-10 items-center text-theme-primary border-b border-theme-background p-3">
              <span className="w-1/5 flex items-center">Status:</span>
              <div className="w-4/5 relative pr-4">
                {bagOrder.status === "SEPARATED" ? (
                  <span className="w-4/5 text-theme-primary">
                    {convertStatus(bagOrder.status)?.name || "Status desconhecido"}
                  </span>
                ) : (
                  <Listbox
                    value={bagStatus}
                    onChange={(value) => {
                      setBagStatus(value);
                      if (value !== currentStatus) {
                        setIsStatusChanged(true);
                      } else {
                        setIsStatusChanged(false);
                      }
                    }}
                    by="value"
                  >
                    {({ open }) => (
                      <div className="w-full relative pt-1">
                        <Listbox.Button
                          className={`relative w-full py-3 cursor-default rounded-2xl bg-white pl-3 pr-10 text-left ${
                            open ? "flex flex-row justify-between items-center rounded-b-none bg-neutral-50 ring-2 ring-slate-gray ring-opacity-50" : "ring-2 ring-slate-300"
                          }`}
                        >
                          <span className="block truncate text-slate-gray px-3">
                            {bagStatus === undefined
                              ? "Selecione um status"
                              : bagStatusOptions.find(option => option.value === bagStatus)?.label}
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5">
                            <LuChevronsUpDown className="h-5 w-5 text-slate-gray" aria-hidden="true" />
                          </span>
                        </Listbox.Button>
                        <Transition leave="transition ease-in duration-50" leaveFrom="opacity-100" leaveTo="opacity-0">
                          <Listbox.Options className="absolute w-full overflow-auto bg-white py-0 text-base shadow-lg rounded-b-2xl ring-2 ring-slate-300 z-10 max-h-60 sm:text-sm">
                            {bagStatusOptions.map((option) => (
                              <Listbox.Option
                                key={option.value}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2.5 pl-10 pr-4 ${
                                    option.value === bagStatus ? "bg-theme-background" : "bg-white"
                                  }`
                                }
                                value={option.value}
                              >
                                {() => (
                                  <>
                                    <span className={`block truncate text-slate-gray pl-3.5`}>{option.label}</span>
                                    {option.value === bagStatus && (
                                      <span className="absolute inset-y-0 left-0 flex items-center pl-5 bg-theme-background">
                                        <FaCheck className="h-4 w-4 text-slate-gray" aria-hidden="true" />
                                      </span>
                                    )}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    )}
                  </Listbox>
                )}
              </div>
            </div>
            <div className="flex gap-10 items-start text-theme-primary border-b border-theme-background p-3">
              <span className="w-1/5">Cliente:</span>
              <span className="w-4/5">{`${bagOrder.user.first_name} ${bagOrder.user.last_name}`}</span>
            </div>
            <div className="flex gap-10 items-start text-theme-primary border-b-[1px] border-theme-background p-3">
              <span className="w-1/5">Prazo:</span>
              <span className="w-4/5">{getNextSaturdayDate()}</span>
            </div>
            <GroupOrder 
              orders={bagOrder.orders} 
            />
          </div>
          <div className="w-full h-[10%] flex justify-center items-end">
            {bagOrder.status === "SEPARATED" ? (
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
                  handleStatusBag(bagOrder.id)
                }}
              />
            ) : bagOrder.status && isStatusChanged ? (
              <Modal
                titleOpenModal="Salvar"
                titleContentModal="Você tem certeza?"
                contentModal="Ao alterar o status para entregue, o cliente será notificado que ela foi entregue."
                bgOpenModal="#00735E"
                titleCloseModal="Cancelar"
                titleConfirmModal="Confirmar"
                bgConfirmModal="#00735E"
                bgCloseModal="#EEF1F4"
                modalAction={() => {
                  handleNewStatus(bagOrder.id, bagStatus as IStatus)
                }}
              />
            ) : (
              <>
                <span className="text-center mt-6 text-slate-gray">Sacola já entregue!</span>
              </>
            )}
          </div>
        </div>
      ) : (
        <span className="text-center text-red-500">Erro ao carregar os dados da sacola</span>
      )}
    </>
  );
}
