"use client";

import React, {
  useEffect,
  useState,
  useMemo,
  useRef,
  useCallback,
} from "react";
import Loader from "@shared/components/Loader";
import OfferCard from "./OfferCard";
import { twMerge } from "tailwind-merge";
import { useHandleError } from "@shared/hooks/useHandleError";
import { useLocalStorage } from "@shared/hooks/useLocalStorage";
import { toast } from "sonner";
import { OfferWithProductDTO } from "@shared/domain/dtos/offer-with-product-dto";
import { CatalogDTO } from "@shared/domain/dtos/catalog-dto";
import { useRouter } from "next/navigation";
import { fetchCatalog } from "@producer/app/_actions/catalogs/fetch-catalog";
import OfferListHeading from "./OfferListHeading";

interface OffersListProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  type: "last" | "current";
  notFoundMessage: string;
}

export default function OffersList({
  title,
  type,
  notFoundMessage,
  ...rest
}: OffersListProps) {
  const [offers, setOffers] = useState<OfferWithProductDTO[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const router = useRouter();
  const { handleError } = useHandleError();

  const LocalStorage = useLocalStorage();

  const cycle = useMemo(
    () => LocalStorage.getFromStorage("selected-cycle"),
    []
  );

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

        const response = await fetchCatalog({
          cycle_id: id as string,
          type,
          page,
        });

        if (response.message) {
          handleError(response.message as string);
        } else if (response.data) {
          const dataOffers: {
            catalog: CatalogDTO;
            offers: OfferWithProductDTO[];
          } = response.data;

          setOffers((prevOffers) => [...prevOffers, ...dataOffers.offers]);

          setHasMore(dataOffers.offers.length > 0);
        }
      } catch {
        handleError("Erro desconhecido.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchListOffers();
  }, [cycle, handleError, page, type]);

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
            <Loader appId="PRODUCER" loaderType="component" />
          </div>
        ) : offers.length > 0 ? (
          <>
            <div className="w-full rounded-2xl p-2.5 overflow-y-scroll snap-y snap-mandatory flex flex-col gap-3.5">
              {offers.map((offer, index) => (
                <OfferCard
                  ref={index === offers.length - 1 ? lastProductRef : null}
                  key={offer.id}
                  offer={offer}
                  onDeleteCard={type === "current" ? onDeleteCard : undefined}
                  editable={type === "current"}
                  repeatable={type === "last"}
                />
              ))}
            </div>
            {isLoading && page > 1 && (
              <div className="w-full flex items-center justify-center">
                <Loader appId="PRODUCER" loaderType="component" />
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
