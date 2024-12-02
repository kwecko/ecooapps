"use client";

import { searchCatalogs } from "@consumer/_actions/catalogs/GET/search-catalogs";
import RedirectCart from "@consumer/app/_components/redirectCart";
import { listCycles } from "@shared/_actions/cycles/GET/list-cycles";
import { useHandleError } from "@shared/hooks/useHandleError";
import { CatalogDTO, CycleDTO } from "@shared/interfaces/dtos";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import ProducerCard from "./components/ProducerCard";

export default function Produtores() {
  const [cycles, setCycles] = useState([] as CycleDTO[]);
  const [cycleId, setCycleId] = useState("" as string);
  const [producers, setProducers] = useState([] as any[]);
  const [page, setPage] = useState(1 as number);
  const [isLoading, setIsLoading] = useState(true);
  const { ref, inView } = useInView();
  const { handleError } = useHandleError();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await listCycles();
        if (response.message) {
          handleError(response.message as string);
        } else if (response.data) {
          const cycles: CycleDTO[] = response.data;
          setCycles(cycles);
        }
      } catch {
        handleError("Erro desconhecido.");
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const searchProducers = async () => {
    const typeCycle = process.env.NEXT_PUBLIC_ENV
      ? process.env.NEXT_PUBLIC_ENV === "dev" ||
        process.env.NEXT_PUBLIC_ENV === "homolog"
        ? "livre"
        : "semanal"
      : "livre";

    const cycle = cycles.find(
      (cycle) => cycle.alias.toLocaleLowerCase() == typeCycle
    );

    if (!cycle) {
      setIsLoading(false);
      return;
    }

    setCycleId(cycle.id as string);

    try {
      const response = await searchCatalogs({
        cycle_id: cycle.id as string,
        page: page,
      });
      if (response.message) {
        handleError(response.message as string);
      } else if (response.data) {
        const catalogs: CatalogDTO[] = response.data;
        let newProducers = catalogs.map((catalog) => {
          return {
            id: catalog.id,
            name: catalog.farm.name,
            tally: catalog.farm.tally,
          };
        });

        if (newProducers.length == 0) {
          setIsLoading(false);
          return;
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
    if (inView) {
      searchProducers();
    }
  }, [inView, cycles]);

  return (
    <div className="flex flex-col h-full">
      <div className="overflow-y-auto">
        {producers && producers.length !== 0
          ? producers.map((producer) => {
              return (
                <ProducerCard
                  key={producer.id}
                  id={producer.id}
                  name={producer.name}
                  tally={producer.tally}
                  cycleId={cycleId}
                />
              );
            })
          : null}
        <div>
          {isLoading && cycles.length > 0 ? <div ref={ref}></div> : null}
        </div>
      </div>
      <div className="min-h-17">
        <RedirectCart />
      </div>
    </div>
  );
}
