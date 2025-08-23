"use client";
import { searchCatalogs } from "@consumer/app/_components/GET/search-catalogs";
import RedirectCart from "@consumer/app/_components/telegram/redirect-cart";
import { listCycles } from "@shared/_actions/cycles/GET/list-cycles";
import { useHandleError } from "@shared/hooks/useHandleError";
import { CatalogDTO, CycleDTO } from "@shared/interfaces/dtos";
import { useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import ProducerCard from "./components/ProducerCard";
import { useLocalStorage } from "@shared/hooks/useLocalStorage";

export default function Produtores() {
  const [producers, setProducers] = useState([] as any[]);
  const [page, setPage] = useState(1 as number);
  const [isLoading, setIsLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();
  const { handleError } = useHandleError();
	const LocalStorage = useLocalStorage();
	const cycleId = useMemo(() => LocalStorage.getFromStorage("cycle_id"),[]);


  const searchProducers = async () => {
		setIsLoading(true);
    try {
      const response = await searchCatalogs({
        cycle_id: cycleId,
        page: page,
				available: true,
				remaining: true
      });
      if (response.message) {
        handleError(response.message as string);
      } else if (response.data) {
        const catalogs: CatalogDTO[] = response.data;
        let newProducers = catalogs.map((catalog) => {
          return catalog;
        });

        if (newProducers.length == 0 || newProducers.length < 20) {
          setHasMore(false);
        }

        setProducers((producers) => [...producers, ...newProducers]);
        setPage((page) => page + 1);
      }
    } catch {
      handleError("Erro desconhecido.");
    } finally {
      setIsLoading(false);
    }
  };

	useEffect(() => {
		if (inView && (inView && !isLoading) && hasMore ) {
			searchProducers();
		}
	}, [inView]);

  return (
    <div className="flex flex-col h-full">
      <div className="overflow-y-auto">
        {  hasMore || (producers && producers.length !== 0) ? 
						producers.map((producer) => {
								return (
									<ProducerCard key={producer.id} {...producer}/>
								);
							})
					:
						(
						<div className="w-full text-center p-2">
							<p>Não há produtores com ofertas</p>
						</div>
						)
				}
				<div className="w-full text-center p-2">
					{hasMore && <div ref={ref}>Carregando...</div>}
				</div>
      </div>
      <div className="min-h-17">
        <RedirectCart />
      </div>
    </div>
  );
}
