"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { toast } from "sonner";

import Button from "@shared/components/Button";
import Card from "@shared/components/Card";
import CustomModal from "@shared/components/CustomModal";
import { useCycleProvider } from "@shared/context/cycle";
import { HiOutlineInformationCircle } from "react-icons/hi";

export function ProductMenu() {
  const router = useRouter()

  const { cycle } = useCycleProvider();

  const [isOfferingDay, setIsOfferingDay] = useState<boolean>(false);

  useEffect(() => {
    if (cycle !== null) {
      const diaAtual = new Date().getDay() + 1;
      const { offer } = cycle

      setIsOfferingDay(false)

      if (Array.isArray(offer) && offer.includes(diaAtual)) {
        setIsOfferingDay(true);
        return;
      }

      setIsOfferingDay(false);
    }
  }, [cycle]);

  const handleClickOfferProductButton = () => {
    if (!cycle) {
      toast.warning("Selecione um ciclo para começar uma oferta!");
      return;
    }

    const { id } = cycle;

    localStorage.setItem("offer-products-data",
      JSON.stringify({
        cycle_id: id
      })
    )

    router.push("/produtos/vender")
  }

  return (
    <Card className="w-full p-5 text-theme-default gap-3.5">
      <div className="flex justify-between items-start gap-2">
        <span className="pt-0.5 pl-1 font-normal text-base leading-5.5 tracking-tight-2">
          Ofereça os seus produtos clicando no botão abaixo
        </span>
        <CustomModal
          titleContentModal="Oferta de Produtos"
          contentModal="Gerencie aqui os produtos que deseja disponibilizar para venda no ciclo de comercialização."
          bgConfirmModal="#2F4A4D"
          titleConfirmModal="Ok"
          buttonOpenModal={
            <HiOutlineInformationCircle className="text-2xl text-theme-primary" />
          }
        />
      </div>
      <div className="w-full flex flex-col gap-3 font-semibold text-base leading-5.5">
        <Button
          onClick={handleClickOfferProductButton}
          className="w-full h-12 bg-theme-default rounded-md text-white"
          href="/"
        >
          {isOfferingDay ? "Ofertar produtos" : "Visualizar ofertas"}
        </Button>
        <Link href={"/relatorios"}>
          <Button className="w-full bg-transparent h-12 rounded-md border-[2px] border-theme-default">
            Gerar relatórios
          </Button>
        </Link>
      </div>
    </Card>
  );
}
