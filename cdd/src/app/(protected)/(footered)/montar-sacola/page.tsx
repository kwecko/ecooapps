'use client'

import { toast } from "sonner";
import { useState } from "react";
import BagsTable from "./components/BagsTable";
import { listBags } from "@cdd/app/_actions/bag/list-bags";

import PagingButton from "@shared/components/PagingButton";
import { useLocalStorage } from "@shared/hooks/useLocalStorage"

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
      toast.error("Selecione um ciclo para montar uma sacola!")
      return
    }

    const { id } = cycle

    const nextPageData = await listBags({
      page: page + 1,
      cycle_id: id,
      status: "PENDING",
    });

    if (nextPageData.data && nextPageData.data.length > 0) {
      setPage((prev) => prev + 1);
    } else {
      setHasNextPage(false);
    }
  };

  return (
    <div className="w-full h-full p-5 pb-6 flex items-center flex-col">
      <div className="flex flex-col h-1/5 w-full items-center justify-end mb-6">
        <h1 className="text-3xl font-medium text-slate-gray mb-6 text-center">Montar sacolas</h1>
        <span className="w-64 text-sm font-medium text-slate-gray text-center">
          Monte as sacolas abaixo
        </span>
      </div>
      <div className="w-full h-[70%] overflow-y-auto">
        <BagsTable page={page} />
      </div>
      <div className="w-full h-[10%] flex justify-center items-end">
        <PagingButton nextPage={nextPage} backPage={backPage} value={page} />
      </div>
    </div>
  );
}
