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
    <div className="w-full rounded-2xl bg-white text-theme-default p-5 tracking-tight leading-5.5 text-base flex flex-row justify-between items-start gap-2">
      {cycle ? (
        <p>
          É hora de:{" "}
          <span className="text-rain-forest font-extrabold tracking-normal">{message}</span>
        </p>
      ) : (
        <p className="text-theme-primary">
          Selecione um ciclo para ver a etapa atual.
        </p>
      )}

      <Button onClick={handleClickButton} type="button">
        <HiOutlineInformationCircle className="text-[24px] text-theme-primary" />
      </Button>
    </div>
  );
}
