'use client'

import { toast } from "sonner";
import { useState, useEffect } from "react";
import BagsTable from "./components/BagsTable";
import { listBags } from "@cdd/app/_actions/bag/list-bags";

import PagingButton from "@shared/components/PagingButton";
import { useLocalStorage } from "@shared/hooks/useLocalStorage"
import { ModelPage } from "@shared/components/ModelPage";

export interface IBagStatus {
  status: "PENDING" | "SEPARATED";
}

export default function Home() {
  const [page, setPage] = useState<number>(1);
  const [prevState, setPrevState] = useState<{ page: number; status: IBagStatus }>({ page: 1, status: { status: "" as IBagStatus["status"] } });
  const [selectedStatus, setSelectedStatus] = useState<IBagStatus>({
    status: "PENDING",
  });

  const { getFromStorage } = useLocalStorage()

  useEffect(() => {
    if (selectedStatus !== prevState.status) {
      setPage(1);
    }
  }, [selectedStatus]);

  const backPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
      setPrevState({ page, status: selectedStatus });
    }
  };

  const nextPage = async () => {

    if (prevState.status.status === selectedStatus.status && prevState.page === page) {
      return;
    }

    setPrevState({ page, status: selectedStatus });

    const cycle = getFromStorage('selected-cycle')

    if (!cycle) {
      toast.error("Selecione um ciclo para montar uma sacola!")
      return
    }

    const { id } = cycle

    const nextPageData = await listBags({
      page: page + 1,
      cycle_id: id,
      status: selectedStatus.status,
    });

    if (nextPageData.data && nextPageData.data.length > 0) {
      setPage((prev) => prev + 1);
    } else {
      return;
    }
  };

  return (
    <ModelPage
      title="Montar sacola"
      titleClassName="gap-5"
      subtitle="Monte as sacolas abaixo"
      subtitleClassName="px-3"
    >
      <div className="w-full h-[70%] overflow-y-auto">
        <BagsTable 
          page={page} 
          selectedStatus={selectedStatus} 
          setSelectedStatus={setSelectedStatus} />
      </div>
      <div className="w-full h-[10%] flex justify-center items-end">
        <PagingButton nextPage={nextPage} backPage={backPage} value={page} />
      </div>
    </ModelPage>
  );
}
