import { twMerge } from "tailwind-merge";

import React from "react";
import { FaCheck, FaExclamation } from "react-icons/fa6";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";

type GetStatusType = "oferta" | "montar" | "enviar" | "farm";

export type OfertaStatus = Array<"PENDING" | "CANCELLED" | "VERIFIED">;
type FarmStatus = "ACTIVE" | "INACTIVE" | "PENDING";
export type MontarStatus = Array<"VERIFIED" | "MOUNTED">;
export type EnviarStatus = Array<
  "MOUNTED" | "DISPATCHED" | "RECEIVED" | "DEFERRED"
>;

export type StatusMap = {
  oferta: "PENDING" | "CANCELLED" | "VERIFIED";
  montar: "VERIFIED" | "MOUNTED";
  enviar: "MOUNTED" | "DISPATCHED" | "RECEIVED" | "DEFERRED";
  farm: FarmStatus;
};

type StatusContent = {
  oferta: { content: JSX.Element; color: string };
  montar: { content: JSX.Element; color: string };
  enviar: { content: JSX.Element; color: string };
  farm: { content: JSX.Element; color: string };
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
      VERIFIED: {
        content: <HiDotsHorizontal size={10} color="white" />,
        color: "bg-walnut-brown",
      },
      MOUNTED: {
        content: <FaCheck className="p-1" color="white" />,
        color: "bg-rain-forest",
      },
    },
    enviar: {
      MOUNTED: {
        content: <FaExclamation size={10} color="white" />,
        color: "bg-battleship-gray",
      },
      DISPATCHED: {
        content: <HiDotsHorizontal color="white" />,
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
    farm: {
      ACTIVE: {
        content: <FaCheck className="p-1" color="white" />,
        color: "bg-rain-forest",
      },
      INACTIVE: {
        content: <IoCloseSharp className="p-0.5" color="white" />,
        color: "bg-error",
      },
      PENDING: {
        content: <HiDotsHorizontal className="p-0.5" color="white" />,
        color: "bg-walnut-brown",
      },
    },
  };

  const getStatus = <T extends GetStatusType>({
    type,
    status,
  }: UseGetStatusProps<T>) => {
    const statusInfo = getStatusInfo[type][status];

    return (
      <div
        className={twMerge(
          "flex justify-center items-center m-auto bg-rain-forest w-4 h-4 rounded-full",
          statusInfo?.color
        )}
      >
        {statusInfo?.content}
      </div>
    );
  };

  return {
    getStatus,
  };
}
