"use client";

import { ModelPage } from "@shared/components/ModelPage";
import AddProductButton from "./components/AddProductButton";
import OffersList from "./components/OffersList";
import { useCycleProvider } from "@shared/context/cycle";
import { useEffect, useState } from "react";

export default function Home() {

  const { cycle } = useCycleProvider();

  const [isOfferingDay, setIsOfferingDay] = useState<boolean>(false);
  
    useEffect(() => {
      if (cycle !== null) {
        const diaAtual = new Date().getDay() + 1;
        const { offer } = cycle;
  
        if (Array.isArray(offer) && offer.includes(diaAtual)) {
          setIsOfferingDay(true);
          return;
        }
  
        setIsOfferingDay(false);
      }
    }, [cycle]);

  const subtitle = isOfferingDay ? "Adicione produtos a sua oferta" : "Visualize as suas ofertas ativas";

  return (
    <ModelPage
      title="Sua oferta"
      titleGap="gap-0.5"
      subtitle={subtitle}
    >
      <div className="w-full h-full overflow-y-hidden flex flex-col pt-2">
        <AddProductButton disabled={!isOfferingDay}/>
        <OffersList
          title="Ofertas Atuais"
          type="current"
          className="h-3/5"
          notFoundMessage="Nenhuma oferta encontrada! Faça uma nova oferta."
          isOfferingDay={isOfferingDay}
        />
        <OffersList
          title="Ofertas Anteriores"
          type="last"
          className="h-2/5"
          notFoundMessage="Não há ofertas anteriores."
          isOfferingDay={isOfferingDay}
        />
      </div>
    </ModelPage>
  );
}
