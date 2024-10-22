"use client";

import { useState } from "react";
import { toast } from "sonner";
import { FarmWithOrdersTable } from "./components/FarmWithOrdersTable";
import { getBoxesWithOrders } from "@cdd/app/_actions/box/get-boxes-with-orders";

import { useLocalStorage } from "@shared/hooks/useLocalStorage"
import PagingButton from "@shared/components/PagingButton";
import { ModelPage } from "@shared/components/ModelPage";

export default function Home() {
  const [page, setPage] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);

  const { getFromStorage } = useLocalStorage()

  const backPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const nextPage = async () => {
    if (!hasNextPage) return;

    const cycle = getFromStorage('selected-cycle')

    if (!cycle) {
      toast.error("Selecione um ciclo para ver os pedidos!")
      return
    }

    const { id } = cycle;

    const nextPageData = await getBoxesWithOrders({
      cycle_id: id,
      page: page + 1,
      name: ""
    });

    if (nextPageData.data && nextPageData.data.length > 0) {
      setPage((prev) => prev + 1);
    } else {
      setHasNextPage(false);
    }
  };

  return (
    <ModelPage
      title="Lista de ofertas"
      titleClassName="gap-5"
      subtitle="Aprove ou rejeite as ofertas abaixo:"
      subtitleClassName="px-3"
    >
      <div className="w-full h-[72%] overflow-y-auto">
        <FarmWithOrdersTable page={page} />
      </div>
      <div className="w-full h-[10%] flex justify-center items-end">
        <PagingButton value={page} nextPage={nextPage} backPage={backPage} />
      </div>
    </ModelPage>
  );
}
