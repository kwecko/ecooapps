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
    <Card className="mt-5 gap-4">
      <div className="flex justify-between items-start mt-[23px]">
        <span className="text-default text-[16px] mb-[13px]">
          Ofereça os seus produtos clicando no botão abaixo
        </span>
        <button>
          <HiOutlineInformationCircle className="text-[24px] text-slate-blue" />
        </button>
      </div>
      <div className="">
        <Button
          onClick={handleClickOfferProductButton}
          className="w-full bg-theme-default rounded-md h-12 mb-[12px] text-white font-semibold"
          disabled={!isOfferingDay || isUnderConstruction("/oferta")}
          href="/"
        >
          Fazer uma oferta
        </Button>
        <Link href={"/"}>
          <Button
            className="w-full bg-transparent rounded-md h-12 mb-[20px] text-[#3E5155] border-2 border-[#3E5155] font-semibold"
            disabled={true}
          >
            Gerar relatórios
          </Button>
        </Link>
      </div>
    </Card>
  );
}
