"use client";

import { useCycleProvider } from "@shared/context/cycle";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { ContentLink } from "@cdd/app/(protected)/(footered)/home/data";
import InfoIconModal from "@shared/components/InfoIconModal";

interface CardComponentProps extends ContentLink {}

export default function CardComponent({
  title,
  link,
  isSelectedCycle,
  hasNotification,
  information,
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
      {information && (
        <div className="h-full flex justify-center items-center">
          <InfoIconModal
            title={information.title}
            content={information.content}
          />
        </div>
      )}
    </div>
  );
}
