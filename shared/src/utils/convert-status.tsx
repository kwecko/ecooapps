import React from 'react';

import { twMerge } from "tailwind-merge";

import { FaCheck, FaExclamation } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";

export const convertStatus = (status: string) => {
  const statuses: Record<string, string> = {
    PENDING: "Pendente",
    VERIFIED: "Verificado",
    CANCELLED: "Cancelado",
    RECEIVED: "Recebido",
  };

  const colorStatus: Record<string, string> = {
    PENDING: "bg-battleship-gray",
    CANCELLED: "bg-error",
    VERIFIED: "bg-rain-forest",
  };

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

  return { name: statuses[status], icon: getIcon() };
}

export default convertStatus;