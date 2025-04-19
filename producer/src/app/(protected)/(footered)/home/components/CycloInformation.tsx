"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { toast } from "sonner";

import Button from "@shared/components/Button";
import Loader from "@shared/components/Loader";
import { useCycleProvider } from "@shared/context/cycle";

export default function CycloInformation() {
  const { cycle } = useCycleProvider();
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClickButton = () => {
    if (!cycle) {
      toast.warning("Selecione um ciclo para ver mais informações sobre ele!");
      return;
    }

    router.push("/informacoes-ciclo");
  };

  useEffect(() => {
    setIsLoading(true);
    if (cycle !== null) {
      const diaAtual = new Date().getDay() + 1;

      const { offer, order, deliver } = cycle;
      setIsLoading(false);

      if (Array.isArray(offer) && offer.includes(diaAtual)) {
        setMessage(" fazer a sua oferta");
      } else if (Array.isArray(order) && order.includes(diaAtual)) {
        setMessage(" dia de compras");
      } else if (Array.isArray(deliver) && deliver.includes(diaAtual)) {
        setMessage(" entregar ao CDD");
      }
    }
    setIsLoading(false);
  }, [cycle]);

  return (
    <>
      {isLoading && !cycle && (
        <div className="flex justify-center">
          <Loader loaderType="component" />
        </div>
      )}
      {!isLoading && cycle && (
        <div className="w-full rounded-2xl bg-white text-theme-default p-5 tracking-tight-2 text-base leading-5.5 flex flex-row justify-between items-start gap-2">
          <p className="pl-1">
            É hora de:{" "}
            <span className="text-theme-highlight font-extrabold tracking-normal">
              {message}
            </span>
          </p>

          <Button onClick={handleClickButton} type="button">
            <HiOutlineInformationCircle className="text-[24px] text-theme-primary" />
          </Button>
        </div>
      )}
    </>
  );
}
