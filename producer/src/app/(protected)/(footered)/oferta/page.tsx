import { ModelPage } from "@shared/components/ModelPage";
import AddProductButton from "./components/AddProductButton";
import OffersList from "./components/OffersList";

export default function Home() {
  return (
    <ModelPage
      title="Sua oferta"
      titleGap="gap-0.5"
      subtitle="Adicione produtos a sua oferta"
    >
      <div className="w-full h-full overflow-y-hidden flex flex-col pt-2">
        <AddProductButton />
        <OffersList
          title="Ofertas Atuais"
          type="current"
          className="h-3/5"
          notFoundMessage="Nenhuma oferta encontrada! Faça uma nova oferta."
        />
        <OffersList
          title="Ofertas Anteriores"
          type="last"
          className="h-2/5"
          notFoundMessage="Não há ofertas anteriores."
        />
      </div>
    </ModelPage>
  );
}
