"use client";

import { useCycleProvider } from "@shared/context";
import Button from "@shared/components/Button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { toast } from "sonner";

export default function CycloInformation() {
  const { cycle } = useCycleProvider();
  const [message, setMessage] = useState<string>("");
  const router = useRouter();

  const handleClickButton = () => {
    if (!cycle) {
      toast.warning("Selecione um ciclo para ver mais informações sobre ele!");
      return;
    }

    router.push("/informacoes-ciclo");
  };

  useEffect(() => {
    if (cycle !== undefined) {
      const diaAtual = new Date().getDay() + 1;

      const { offer, order, deliver } = cycle;

      if (Array.isArray(offer) && offer.includes(diaAtual)) {
        setMessage(" fazer a sua oferta");
      } else if (Array.isArray(order) && order.includes(diaAtual)) {
        setMessage(" dia de compras");
      } else if (Array.isArray(deliver) && deliver.includes(diaAtual)) {
        setMessage(" entregar ao CDD");
      }
    }
  }, [cycle]);

  return (
    <div className="mt-5 w-full h-fit py-5 rounded-2xl bg-white p-4">
      <div className="flex justify-between items-center">
        {cycle ? (
          <p className="text-default text-[16px]">
            É hora de:{" "}
            <span className="text-[#00735E] font-bold">{message}</span>
          </p>
        ) : (
          <p className="text-theme-primary text-[16px]">
            Selecione um ciclo para ver a etapa atual.
          </p>
        )}

        <Button onClick={handleClickButton} type="button">
          <HiOutlineInformationCircle className="text-[24px] text-slate-blue" />
        </Button>
      </div>
    </div>
  );
}
