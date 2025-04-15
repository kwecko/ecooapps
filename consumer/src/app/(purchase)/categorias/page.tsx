"use client";
import { searchCategories } from "@consumer/app/_components/GET/search-categories";
import RedirectCart from "@consumer/app/_components/redirectCart";
import { listCycles } from "@shared/_actions/cycles/GET/list-cycles";
import { useHandleError } from "@shared/hooks/useHandleError";
import { CycleDTO, CategoryDTO } from "@shared/interfaces/dtos";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import CategoryCard from "./components/CategoryCard";

export default function Categorias() {
  const [cycles, setCycles] = useState([] as CycleDTO[]);
  const [cycleId, setCycleId] = useState("" as string);
  const [categories, setCategories] = useState([] as any[]);
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
      } 
    })();
  }, []);

  const loadCategories = async () => {

    const typeCycle = process.env.NEXT_PUBLIC_ENV
      ? process.env.NEXT_PUBLIC_ENV === "dev" ||
        process.env.NEXT_PUBLIC_ENV === "homolog"
        ? "livre"
        : "semanal"
      : "livre";

    const cycle = cycles.find(
      (cycle) => cycle.alias.toLowerCase() == typeCycle
    );

    if (!cycle) {
      setIsLoading(false);
      return;
    }

    setCycleId(cycle.id as string);
    localStorage.setItem("selected-cycle", JSON.stringify(cycle));

    try {
      const response = await searchCategories({
        cycle_id: cycle.id as string,
        page: page,
      });
      if (response.message) {
        handleError(response.message as string);
      } else if (response.data) {
        const categories: CategoryDTO[] = response.data;
        let newCategories = categories.map((category) => {
          return category;
        });

        if (newCategories.length == 0) {
          setIsLoading(false);
          return;
        }

        setCategories((categories) => [...categories, ...newCategories]);
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
      loadCategories();
    }
  }, [inView, cycles]);

  return (
    <div className="flex flex-col h-full">
      <div className="overflow-y-auto">
        {categories && categories.length !== 0
          ? categories.map((category) => {
              return (
                <CategoryCard key={category.id} {...category}/>
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
