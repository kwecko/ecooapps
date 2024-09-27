'use client';

import { useRouter } from "next/navigation";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { toast } from "sonner";
import { useLocalStorage } from "@shared/hooks/useLocalStorage"

interface CardComponentProps {
  title: string,
  link: string,
  linkIcon?: string,
  isSelectedCycle?: boolean
  hasNotification?: boolean
  disabled?: boolean
}

export default function CardComponent({ title, link, linkIcon, isSelectedCycle, hasNotification , disabled = false }: CardComponentProps) {
  const router = useRouter();

  const { getFromStorage } = useLocalStorage()

  const handleClickSelectedCycle = () => {
    const cycle = getFromStorage('selected-cycle')

    if (!cycle) {
      toast.warning("Selecione um ciclo para continuar!");
      return;
    }

    router.push(link);
  };

  return (
    <div className="w-full h-full items-center mt-5 p-4 rounded-2xl bg-white flex gap-4">
      <div className="w-[90%] h-full flex items-center">
        <button 
          onClick={handleClickSelectedCycle} 
          disabled={disabled}
          className={`w-full rounded-md p-4 text-white font-semibold relative 
            ${disabled ? 'bg-[#4A403A] opacity-50 cursor-not-allowed' : 'bg-[#4A403A] cursor-pointer'}`}
        >
          {title}
          {hasNotification && (
            <span className="absolute top-0 right-0 mt-[-10px] mr-[-10px] flex h-5 w-5">
              <span className="relative inline-flex rounded-full h-5 w-5 bg-[#FF7070] text-white text-xs font-bold items-center justify-center">4</span>
            </span>
          )}
        </button>
      </div>
      <div className="w-[10%] h-full flex justify-center items-center">
        <button 
          disabled={disabled} 
          className={`rounded-full p-2 ${disabled ? 'text-gray-400' : 'text-[#7B7B7B]'}`}
        >
          <HiOutlineInformationCircle size={24} />
        </button>
      </div>
    </div>
  );
}
