import { twMerge } from "tailwind-merge";

import { FaCheck, FaExclamation } from "react-icons/fa6";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaBoxOpen } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";

type GetStatusType = "oferta" | "montar" | "enviar";

type OfertaStatus = "PENDING" | "CANCELLED" | "VERIFIED";
export type MontarStatus = "PENDING" | "SEPARATED";
export type EnviarStatus = "SEPARATED" | "DISPATCHED" | "RECEIVED" | "DEFERRED";

type StatusMap = {
  oferta: OfertaStatus;
  montar: MontarStatus;
  enviar: EnviarStatus;
};

type StatusContent = {
  oferta: { content: JSX.Element; color: string };
  montar: { content: JSX.Element; color: string };
  enviar: { content: JSX.Element; color: string };
};

type StatusInfo = {
  [K in GetStatusType]: Record<StatusMap[K], StatusContent[K]>;
};

interface UseGetStatusProps<T extends GetStatusType> {
  type: T;
  status: StatusMap[T];
}

export function useGetStatus() {
  const getStatusInfo: StatusInfo = {
    oferta: {
      PENDING: {
        content: <HiDotsHorizontal className="p-0.5" color="white" />,
        color: "bg-walnut-brown",
      },
      CANCELLED: {
        content: <IoCloseSharp className="p-0.5" color="white" />,
        color: "bg-error",
      },
      VERIFIED: {
        content: <FaCheck className="p-1" color="white" />,
        color: "bg-rain-forest",
      },
    },
    montar: {
      PENDING: {
        content: <FaBoxOpen size={10} color="white" />,
        color: "bg-walnut-brown",
      },
      SEPARATED: {
        content: <FaExclamation size={10} color="white" />,
        color: "bg-battleship-gray",
      },
    },
    enviar: {
      SEPARATED: {
        content: <FaExclamation size={10} color="white" />,
        color: "bg-battleship-gray",
      },
      DISPATCHED: {
        content: <HiDotsHorizontal className="p-0.5" color="white" />,
        color: "bg-walnut-brown",
      },
      RECEIVED: {
        content: <FaCheck className="p-1" color="white" />,
        color: "bg-rain-forest",
      },
      DEFERRED: {
        content: <IoCloseSharp className="p-0.5" color="white" />,
        color: "bg-error",
      },
    },
  };

  const getStatus = <T extends GetStatusType>({ type, status }: UseGetStatusProps<T>) => {
    const statusInfo = getStatusInfo[type][status];

    return (
      <div
        className={twMerge(
          "flex justify-center items-center m-auto bg-rain-forest w-4 h-4 rounded-full",
          statusInfo.color
        )}
      >
        {statusInfo.content}
      </div>
    );
  };

  return {
    getStatus,
  };
}