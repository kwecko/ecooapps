"use client";

import { useEffect, useState, useMemo } from "react";
import Loader from "@shared/components/Loader";
import OfferCard from "./OfferCard";
import { twMerge } from "tailwind-merge";
import { useHandleError } from "@shared/hooks/useHandleError";
import { useLocalStorage } from "@shared/hooks/useLocalStorage";
import { toast } from "sonner";
import { OfferWithProductDTO } from "@shared/domain/dtos/offer-with-product-dto";
import { CatalogDTO } from "@shared/domain/dtos/catalog-dto";
import { useRouter } from "next/navigation";
import { fetchLastCatalog } from "@producer/app/_actions/catalogs/fetch-last-catalog";

interface OffersListProps extends React.HTMLAttributes<HTMLDivElement> {
}

export default function OffersList({ ...rest }: OffersListProps) {
  const [offers, setOffers] = useState<OfferWithProductDTO[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const { handleError } = useHandleError();

  const LocalStorage = useLocalStorage();

  const cycle = useMemo(() => LocalStorage.getFromStorage("selected-cycle"), []);

  useEffect(() => {
    if (!cycle) {
      setIsLoading(false);
      toast.error("Selecione um ciclo para acessar as ofertas!");
      router.push("/");
      return;
    }

    const fetchListOffers = async () => {
      setIsLoading(true);

      try {
        const { id } = cycle;

        const response = await fetchLastCatalog({
          cycle_id: id as string,
        });

        if (response.message) {
          handleError(response.message as string);
        } else if (response.data) {
          const dataOffers: {
            catalog: CatalogDTO;
            offers: OfferWithProductDTO[];
          } = response.data;
          setOffers(dataOffers.offers);
        }
      } catch {
        handleError("Erro desconhecido.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchListOffers();
  }, [cycle, handleError]);

  const onDeleteCard = (offerId: string) => {
    const newOffers = offers?.filter((offer) => offer.id !== offerId);
    setOffers(newOffers);
  }

  return (
    <div className=
      {twMerge(`flex flex-col gap-2 w-full m-0 overflow-y-auto`, rest.className)}>
      {isLoading ? (
        <div className="w-full h-20 flex items-center justify-center">
          <Loader 
            appId="PRODUCER"
            loaderType="component"
          />
        </div>
      ) : (
        offers.length > 0 ? (
          <div className="m-0 w-full rounded-2xl p-2.5 overflow-y-scroll snap-y snap-mandatory flex flex-col gap-3.5">
            {offers.map((offer) => (
              <OfferCard key={offer.id} offer={offer} onDeleteCard={onDeleteCard} />
            ))}
          </div>
        ) : (
          <div className="m-0 w-full rounded-2xl p-2.5">
            <p className="w-full px-10
            text-center text-sm text-gray-500">Nenhuma oferta encontrada! Faça uma nova oferta.</p>
          </div>
        ))}


    </div>
  );
}
