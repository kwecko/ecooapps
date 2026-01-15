"use client";

import { fetchCatalog } from "@producer/_actions/catalogs/GET/fetch-catalog";
import { fetchFarmsOwn } from "@producer/app/_actions/farms/GET/farms-own";
import Loader from "@shared/components/Loader";
import { first } from '@shared/utils/first';
import { useHandleError } from "@shared/hooks/useHandleError";
import { useLocalStorage } from "@shared/hooks/useLocalStorage";
import { CatalogDTO, OfferDTO } from "@shared/interfaces/dtos";
import { useRouter } from "next/navigation";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import OfferCard from "./OfferCard";
import OfferListHeading from "./OfferListHeading";

interface OffersListProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  type: "last" | "current";
  notFoundMessage: string;
  isOfferingDay: boolean;
  filterDuplicatesWithCurrent?: boolean; 
}

export default function OffersList({
  title,
  type,
  isOfferingDay,
  notFoundMessage,
  filterDuplicatesWithCurrent = false,
  ...rest
}: OffersListProps) {
  const [offers, setOffers] = useState<OfferDTO[]>([] as OfferDTO[]);
  const [farm_id, setFarmId] = useState<string>("");
  const [catalogId, setCatalogId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const router = useRouter();
  const offerType = isOfferingDay ? "current" : null;
  const offerTypeRepeat = isOfferingDay ? "last" : null;
  const { handleError } = useHandleError();
  const LocalStorage = useLocalStorage();

  const cycle = useMemo(
    () => LocalStorage.getFromStorage("selected-cycle"),
    []
  );

  useEffect(() => {
  if (!cycle) return;
  const fetchFarms = async () => {
    const response = await fetchFarmsOwn();
    if (response.data && response.data.id) {
      setFarmId(response.data.id);
    } else {
      handleError("Nenhuma fazenda encontrada para o usuário.");
    }
  };
  fetchFarms();
}, [cycle, handleError]);

  useEffect(() => {
    if (!cycle) {
      setIsLoading(false);
      toast.error("Selecione um ciclo para acessar as ofertas!");
      router.push("/");
      return;
    }

    if (!farm_id) return;

    const fetchListOffers = async () => {
      setIsLoading(true);

      const lastTypeSinceReference = first(cycle.offer);
      lastTypeSinceReference.setDate(lastTypeSinceReference.getDate() - 7);
      const formattedDDMMYYYY = lastTypeSinceReference
        .toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })
        .replace(/\//g, '-');

      try {

        const response = await fetchCatalog({
          type,
          farm_id: farm_id,
          since: formattedDDMMYYYY,
          page,
        });

        console.log(response.data);

        if (response.message) {
          handleError(response.message as string);
        } else if (response.data) {
          const dataOffers: CatalogDTO = response.data;

          if (!dataOffers) {
            setHasMore(false);
            return;
          } else if (filterDuplicatesWithCurrent && type === "last") {
              const currentResponse = await fetchCatalog({
                type: "current",
                farm_id: farm_id,
                since: formattedDDMMYYYY,
                page: 1,
              });

              const currentProductIds = currentResponse.data?.offers?.product?.id
                ? [currentResponse.data.offers.product.id]
                : [];
                    dataOffers.offers = dataOffers.offers.filter(
                (offer: any) => !currentProductIds.includes(offer.product?.id)
                    );
            }
            setCatalogId(dataOffers.id);
            setOffers((prevOffers) => [...prevOffers, ...dataOffers.offers]);
            setHasMore(dataOffers.offers.length > 0);
        }
      } catch (error) {
        console.log("Erro 2", error);
        handleError("Erro desconhecido.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchListOffers();
  }, [cycle, handleError, type, farm_id]);

  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [isLoading, hasMore]);

  const lastProductRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loadMore]
  );

  const onDeleteCard = (offerId: string) => {
    const newOffers = offers?.filter((offer) => offer.id !== offerId);
    setOffers(newOffers);
  };

  return (
    <>
      <div
        {...rest}
        className={twMerge(
          "shrink-1 h-1/2 grow-0 w-full overflow-y-hidden flex flex-col items-start gap-3 pt-3",
          rest.className
        )}
      >
        <OfferListHeading title={title} />
        {isLoading && page === 1 ? (
          <div className="w-full h-20 flex items-center justify-center">
            <Loader loaderType="component" />
          </div>
        ) : offers.length > 0 ? (
          <>
            <div className="w-full rounded-2xl p-2.5 overflow-y-scroll snap-y snap-mandatory flex flex-col gap-3.5">
              {offers.map((offer, index) => (
                <OfferCard
                  ref={index === offers.length - 1 ? lastProductRef : null}
                  key={`offer-${offer.id}-${index}`}
                  offer={offer}
                  onDeleteCard={type === offerType ? onDeleteCard : undefined}
                  editable={type === offerType}
                  repeatable={type === offerTypeRepeat}
                  catalogId={catalogId}
                />
              ))}
            </div>
            {isLoading && page > 1 && (
              <div className="w-full flex items-center justify-center">
                <Loader loaderType="component" />
              </div>
            )}
          </>
        ) : (
          <div className="m-0 w-full rounded-2xl p-2.5">
            <p
              className="w-full px-10
            text-center text-sm text-gray-500"
            >
              {notFoundMessage}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
