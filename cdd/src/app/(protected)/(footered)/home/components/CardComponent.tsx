"use client";

import { useCycleProvider } from "@shared/context/cycle";
import { useRouter } from "next/navigation";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { toast } from "sonner";

interface CardComponentProps {
  title: string;
  link: string;
  linkIcon?: string;
  isSelectedCycle?: boolean;
  hasNotification?: boolean;
  disabled?: boolean;
}

export default function CardComponent({
  title,
  link,
  linkIcon,
  isSelectedCycle,
  hasNotification,
  disabled = false,
}: CardComponentProps) {
  const router = useRouter();

  const { cycle } = useCycleProvider();

  const handleClickSelectedCycle = () => {
    if (isSelectedCycle && !cycle) {
      toast.warning("Selecione um ciclo para continuar!");
      return;
    }

    router.push(link);
  };

  return (
    <div className="w-full items-center justify-between p-3.75 rounded-2xl bg-white flex flex-row gap-4.5">
      <div className="w-full flex items-center">
        <button
          onClick={handleClickSelectedCycle}
          disabled={disabled}
          className={`w-full rounded-md p-3.25 text-white font-semibold text-base leading-5.5 relative  bg-theme-home-bg
            ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        >
          {title}
          {hasNotification && (
            <span className="absolute top-0 right-0 mt-[-10px] mr-[-10px] flex h-5 w-5">
              <span className="relative inline-flex rounded-full h-5 w-5 bg-[#FF7070] text-white text-xs font-bold items-center justify-center">
                4
              </span>
            </span>
          )}
        </button>
      </div>
      <div className="h-full flex justify-center items-center">
        <button
          disabled={disabled}
          className={`rounded-full p-2 ${
            disabled ? "text-gray-400" : "text-[#7B7B7B]"
          }`}
        >
          <HiOutlineInformationCircle size={24} />
        </button>
      </div>
    </div>
  );
}
