import React from 'react';

import { twMerge } from "tailwind-merge";

import { FaCheck, FaExclamation } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";

export const convertStatus = (status: string) => {
  const statuses: Record<string, string> = {
    PENDING: "Pendente",
    SEPARATED: "Separado",
    DISPATCHED: "Enviado",
    RECEIVED: "Recebido",
    CANCELLED: "Cancelado",
    DEFERRED: "Retornado",
    VERIFIED: "Verificado",
    ACTIVE: "Aprovado",
    INACTIVE: "Rejeitado"
  };

  const colorStatus: Record<string, string> = {
    PENDING: "bg-battleship-gray",
    CANCELLED: "bg-error",
    VERIFIED: "bg-rain-forest",
  };

  const textColorStatus: Record<string, string> = {
    PENDING: "text-battleship-gray",
    SEPARATED: "text-rain-forest",
    DISPATCHED: "text-rain-forest",
    RECEIVED: "text-rain-forest",
    CANCELLED: "text-error",
    DEFERRED: "text-rain-forest",
    VERIFIED: "text-rain-forest",
    ACTIVE: "text-rain-forest",
    INACTIVE: "text-error"
  };

  const getNameColor = () => {
    return textColorStatus[status];
  }

  const getIcon = () => {
    return (
      <div
        className={twMerge(
          "flex justify-center items-center m-auto bg-rain-forest w-4 h-4 p-1 rounded-full",
          `${colorStatus[status]}`
        )}
      >
        {status === 'VERIFIED' || status === "RECEIVED" && (<FaCheck color="white" />)}
        {status === "CANCELLED" && (<IoCloseSharp color="white" />)}
        {status === "PENDING" && (<FaExclamation size={10} color="white" />)}
      </div>
    );
  }

  return { name: statuses[status], nameColor: getNameColor(), icon: getIcon() };
}

export default convertStatus;