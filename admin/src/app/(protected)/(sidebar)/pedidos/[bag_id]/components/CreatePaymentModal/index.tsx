"use client";

import ModalV2 from "@shared/components/ModalV2";
import SelectInput from "@shared/components/SelectInput";

import { formatDateToDateAndTime } from "@shared/utils/date-handlers";
import { formatPrice } from "@shared/utils/format-price";

import { BagDTO } from "@shared/interfaces/dtos";
import { CreatePaymentDTO } from "@shared/interfaces/dtos/payment-dto";

import {
  paymentFlagOptions,
  paymentMethodOptions,
  paymentStatusOptions,
} from "./constants";
import Loader from "@shared/components/Loader";
import { useState } from "react";

interface EditPaymentModalProps {
  isOpen: boolean;
  bag: BagDTO;
  loading: boolean;
  createNewPayment: (payment: CreatePaymentDTO) => void;
  closeModal: () => void;

}

export default function CreatePaymentModal({
  isOpen,
  bag,
  loading,
  createNewPayment,
  closeModal,
}: EditPaymentModalProps) {

  const today = new Date();
  const todayString = today.toISOString().split("T")[0];

  const [payment, setPayment] = useState<CreatePaymentDTO>({ bag_id: bag.id, method: "CASH", status: "PENDING" } as CreatePaymentDTO);

  return (
    <ModalV2
      isOpen={isOpen}
      closeModal={closeModal}
      className="w-152 text-coal-black"
      title="Informações do pagamento"
      iconClose={true}
    >
      <div className="rounded-lg bg-white lg:text-theme-primary">
        <div className="p-6">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium w-32">Valor:</p>
              <p className="flex-1">{formatPrice(bag.price)}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium w-32">Data:</p>
              <p className="font-semibold flex-1">
                {formatDateToDateAndTime(todayString)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2">
        <SelectInput
          label="Selecione o método de pagamento"
          options={paymentMethodOptions}
          defaultOption={paymentMethodOptions.find(
            (option) => option.value === payment.method
          )}
          onChange={(value) => {
            setPayment((prevPayment) => {
              return {
                ...prevPayment,
                method: value,
              } as CreatePaymentDTO;
            })
          }}
        />
      </div>
      {["CREDIT", "DEBIT"].includes(payment.method) && (
        <SelectInput
          label="Selecione a bandeira do cartão"
          options={paymentFlagOptions}
          defaultOption={paymentFlagOptions.find(
            (option) => option.value === payment.flag
          )}
          onChange={(value) => {
            setPayment((prevPayment) => {
              return {
                ...prevPayment,
                flag: value,
              } as CreatePaymentDTO;
            })
          }}
        />
      )}

      <div className="flex gap-2 mt-4">
        <button
          className="w-full text-rain-forest justify-center rounded-md border border-transparent bg-white px-3 py-4 font-semibold h-12 flex items-center font-inter text-base leading-5.5 tracking-tight-2"
          onClick={() => closeModal()}
        >
          Cancelar
        </button>

        <button
          className="w-full text-white justify-center rounded-md border border-transparent bg-rain-forest px-3 py-4 font-semibold h-12 flex items-center font-inter text-base leading-5.5 tracking-tight-2"
          onClick={() => {
            createNewPayment(payment)
          }}
        >
          {loading ? <Loader loaderType="component" /> : "Salvar"}
        </button>
      </div>
    </ModalV2>
  );
}
