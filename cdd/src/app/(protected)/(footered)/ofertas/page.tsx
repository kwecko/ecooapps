"use client";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useState } from "react";
import { FarmWithOrdersTable } from "./components/FarmWithOrdersTable";
import { fecthFarmsWithOrders } from "@cdd/app/_actions/farm/fetch-farm-with-orders";
import { useLocalStorage } from "@shared/hooks/useLocalStorage"
import { toast } from "sonner";
import PagingButton from "@shared/components/PagingButton";

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

    const nextPageData = await fecthFarmsWithOrders({
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
    <div className="w-full h-full p-5 pb-6 flex items-center flex-col">
      <div className="flex flex-col h-[18%] w-full items-center justify-end mt-4">
        <h1 className="text-3xl font-medium text-slate-gray mb-4 text-center">Lista de ofertas</h1>
        <span className="text-sm font-medium text-slate-gray mb-6 text-center">
          Aprove ou rejeite as ofertas abaixo:
        </span>
      </div>
      <div className="w-full h-[72%] overflow-y-auto">
        <FarmWithOrdersTable page={page} />
      </div>
      <div className="w-full h-[10%] flex justify-center items-end">
        <PagingButton value={page} nextPage={nextPage} backPage={backPage} />
      </div>
    </div>
  );
}
