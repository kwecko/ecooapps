"use client";

import Link from "next/link";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { useEffect, useState } from "react";

import { isUnderConstruction } from "@shared/next/library/is-under-construction";
import Button from "@shared/components/Button";
import Card from "@shared/components/Card";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useCycleProvider } from "@shared/context";

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
    const cycle_idString = localStorage.getItem("selected-cycle") as string;

    if (!cycle_idString) {
      toast.warning("Selecione um ciclo para começar uma oferta!");
      return;
    }

    const { id } = JSON.parse(cycle_idString);

    localStorage.setItem(
      "offer-products-data",
      JSON.stringify({
        cycle_id: id,
      })
    );

    router.push("/oferta");
  };

  return (
    <Card className="gap-3.5 font-poppins p-5 pt-5 pr-5 pl-5 w-full">
      <div className="flex justify-between gap-2 items-start pr-0 pl-1">
        <span className="pt-1 font-normal text-base leading-5.5 tracking-tight">
          Ofereça os seus produtos clicando no botão abaixo
        </span>
        <button>
          <HiOutlineInformationCircle className="text-[24px] text-theme-primary" />
        </button>
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
