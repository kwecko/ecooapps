"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Cycle, fetchCycles } from "../../_actions/fetch-cycles";
import RedirectCart from "@consumer/app/_components/redirectCart";
import ProducerCard from "./components/ProducerCard";
import { searchCatalogs } from "@consumer/app/_actions/search-catalogs";
import { ICatalog } from "@shared/interfaces/catalog";
import { useHandleError } from "@shared/hooks/useHandleError";

export default function Produtores() {
  const [cycles, setCycles] = useState([] as Cycle[]);
  const [cycleId, setCycleId] = useState("" as string);
  const [producers, setProducers] = useState([] as any[]);
  const [page, setPage] = useState(1 as number);
  const [isLoading, setIsLoading] = useState(true);
  const { ref, inView } = useInView();
  const { handleError } = useHandleError();

  useEffect(() => {
    (async () => {
      const cycles = await fetchCycles();
      setCycles(cycles);
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
        const catalogs: ICatalog[] = response.data;
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
