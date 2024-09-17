import PageHeader from "./components/PageHeader";
import OfferListHeading from "./components/OfferListHeading";
import OffersList from "./components/OffersList";

export default function Home() {
  return (
    <div className="flex flex-col h-[inherit] bg-theme-background px-5 justify-start w-full overflow-y-hidden">
      <PageHeader />
      <div className="max-h-[calc(var(--min-page-height)-13.3rem)] w-full flex flex-col items-center px-.5">
        <OfferListHeading title="Ofertas Atuais" />
        <OffersList />
      </div>
    </div>
  );
}
