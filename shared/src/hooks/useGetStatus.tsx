import { twMerge } from "tailwind-merge";

import { FaCheck, FaExclamation } from "react-icons/fa6";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";

type GetStatusType = "oferta" | "montar" | "enviar" | "farm";

export type OfertaStatus = Array<"PENDING" | "CANCELLED" | "VERIFIED">;
type FarmStatus = "ACTIVE" | "INACTIVE" | "PENDING";
export type MontarStatus = Array<"VERIFIED" | "MOUNTED">;
export type EnviarStatus = Array<
  "MOUNTED" | "DISPATCHED" | "RECEIVED" | "DEFERRED" | "FETCH" | "FETCHED"
>;

export type StatusMap = {
  oferta: "PENDING" | "CANCELLED" | "VERIFIED" | "REJECTED";
  montar: "VERIFIED" | "MOUNTED";
  enviar:
    | "MOUNTED"
    | "DISPATCHED"
    | "RECEIVED"
    | "DEFERRED"
    | "FETCH"
    | "FETCHED";
  farm: FarmStatus;
};

type StatusContent = {
  oferta: {
    content?: JSX.Element;
    color?: string;
    text?: string;
    textColor?: string;
  };
  montar: {
    content?: JSX.Element;
    color?: string;
    text?: string;
    textColor?: string;
  };
  enviar: {
    content?: JSX.Element;
    color?: string;
    text?: string;
    textColor?: string;
  };
  farm: {
    content?: JSX.Element;
    color?: string;
    text?: string;
    textColor?: string;
  };
};

type StatusInfo = {
  [K in GetStatusType]: Record<StatusMap[K], StatusContent[K]>;
};

interface UseGetStatusProps<T extends GetStatusType> {
  type: T;
  status: StatusMap[T];
}

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
    REJECTED: {
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
      color: "bg-[#4F4743]",
      text: "Montar",
      textColor: "text-[#FFFFFF]",
    },
    MOUNTED: {
      content: <FaCheck className="p-1" color="white" />,
      color: "bg-[#EEF1F4]",
      text: "Pronta",
      textColor: "text-[#545F71]",
    },
  },
  enviar: {
    MOUNTED: {
      content: <FaExclamation size={10} color="white" />,
      color: "bg-[#4F4743]",
      text: "Enviar",
      textColor: "text-[#FFFFFF]",
    },
    DISPATCHED: {
      content: <HiDotsHorizontal color="white" />,
      color: "bg-[#EEF1F4]",
      text: "Enviada",
      textColor: "text-[#545F71]",
    },
    RECEIVED: {
      content: <FaCheck className="p-1" color="white" />,
      color: "bg-[#00735E]",
      text: "Recebida",
      textColor: "text-[#FFFFFF]",
    },
    DEFERRED: {
      content: <IoCloseSharp className="p-0.5" color="white" />,
      color: "bg-error",
      text: "Retornada",
      textColor: "text-white",
    },
    FETCH: {
      color: "bg-[#4F4743]",
      text: "Retirar",
      textColor: "text-[#FFFFFF]",
    },
    FETCHED: {
      color: "bg-[#00735E]",
      text: "Retirada",
      textColor: "text-[#FFFFFF]",
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

export function useGetStatus() {
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

export function useGetStatusText() {
  const getStatus = <T extends GetStatusType>({
    type,
    status,
  }: UseGetStatusProps<T>) => {
    const statusInfo = getStatusInfo[type][status];

    return (
      <div
        className={twMerge(
          "flex justify-center items-center bg-rain-forest py-2 px-4 rounded-full font-inter font-semibold text-sm leading-4.75 tracking-tight-2",
          statusInfo?.color,
          statusInfo?.textColor
        )}
      >
        <span className="w-full">{statusInfo?.text}</span>
      </div>
    );
  };

  return {
    getStatus,
  };
}
