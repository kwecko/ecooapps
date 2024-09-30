import PageHeader from "./components/PageHeader";
import AddProductButton from "./components/AddProductButton";
import OfferListHeading from "./components/OfferListHeading";
import OffersList from "./components/OffersList";
import { ModelPage } from "@shared/components/ModelPage";

export default function Home() {
  return (
    <ModelPage
      title="Sua oferta"
      titleGap="gap-0.5"
      subtitle="Adicione produtos a sua oferta"
    >
      <div className="w-full overflow-y-auto flex flex-col pt-2">
        <AddProductButton />
        <OffersList />
      </div>
    </ModelPage>
  );
}
