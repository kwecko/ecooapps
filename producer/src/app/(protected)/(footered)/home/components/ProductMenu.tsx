"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { toast } from "sonner";

import { isUnderConstruction } from "@shared/next/library/is-under-construction";
import Button from "@shared/components/Button";
import Card from "@shared/components/Card";
import { useCycleProvider } from "@shared/context/cycle";
import CustomInfoModal from "@shared/components/CustomModal";

export function ProductMenu() {
  const router = useRouter();

  const { cycle } = useCycleProvider();

  const [isOfferingDay, setIsOfferingDay] = useState<boolean>(false);

  useEffect(() => {
    if (cycle !== undefined) {
      const diaAtual = new Date().getDay() + 1;
      const { offer } = cycle;

      if (Array.isArray(offer) && offer.includes(diaAtual)) {
        setIsOfferingDay(true);
        return;
      }

      setIsOfferingDay(false)
    }
  }, [cycle]);

  const handleClickOfferProductButton = () => {
    if(!cycle){
      toast.warning("Selecione um ciclo para começar uma oferta!");
      return;
    }

    const { id } = cycle

    localStorage.setItem(
      "offer-products-data",
      JSON.stringify({
        cycle_id: id,
      })
    );

    router.push("/oferta");
  };

  const handleClickInfoButton = () => {
    
  }

  return (
    <Card className="gap-3.5 p-5 w-full text-theme-default">
      <div className="flex justify-between gap-2 items-start pr-0 pl-1">
        <span className="font-normal text-base leading-5.5 tracking-tight">
          Ofereça os seus produtos clicando no botão abaixo
        </span>
        <CustomInfoModal
          titleContentModal="Oferta de Produtos"
          contentModal="Gerencie aqui os produtos que deseja disponibilizar para venda no ciclo de comercialização."
          bgConfirmModal="#2F4A4D"
          titleConfirmModal="Ok"
        />
      </div>
      <div className="w-full flex flex-col gap-3 font-semibold text-base leading-5.5">
        <Button
          onClick={handleClickOfferProductButton}
          className="w-full h-12 bg-theme-default rounded-md text-white"
          disabled={!isOfferingDay || isUnderConstruction("/oferta")}
          href="/"
        >
          Fazer uma oferta
        </Button>
        <Link href={"/"}>
          <Button
            className="w-full bg-transparent h-12 rounded-md border-[2px] border-theme-default"
            disabled={true}
          >
            Gerar relatórios
          </Button>
        </Link>
      </div>
    </Card>
  );
}
