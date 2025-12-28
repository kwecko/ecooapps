"use client";
import { searchCategories } from "@consumer/app/_actions/api/GET/search-categories";
import RedirectCart from "@consumer/app/_components/telegram/redirect-cart";
import { useHandleError } from "@shared/hooks/useHandleError";
import { useLocalStorage } from "@shared/hooks/useLocalStorage";
import { CategoryDTO } from "@shared/interfaces/dtos";
import { useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import CategoryCard from "./components/CategoryCard";

export default function Categorias() {

  const [categories, setCategories] = useState([] as any[]);
  const [page, setPage] = useState(1 as number);
  const [isLoading, setIsLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();
  const { handleError } = useHandleError();

	const LocalStorage = useLocalStorage();
	const cycleId = useMemo(() => LocalStorage.getFromStorage("cycle_id"),[]);
	
  const loadCategories = async () => {
		setIsLoading(true);
    try {
      const response = await searchCategories({
        cycle_id: cycleId,
        page: page,
				available: 'CYCLE',
      });
      if (response.message) {
        handleError(response.message as string);
      } else if (response.data) {
        const categories: CategoryDTO[] = response.data;
        let newCategories = categories.map((category) => {
          return category;
        });

        if (newCategories.length == 0 || newCategories.length < 20) {
          setHasMore(false);
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
		if (inView && (inView && !isLoading) && hasMore ) {
			loadCategories();
		}
	}, [inView]);

  return (
    <div className="flex flex-col h-full">
      <div className="overflow-y-auto">
        {
					categories && categories.length !== 0 ?
          	categories.map((category) => {
              return (
                <CategoryCard key={category.id} {...category}/>
              );
            })
					:
						(
						<div className="w-full text-center p-2">
							<p>Não há categorias com ofertas</p>
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
