'use client'

import { useState } from "react";
import { toast } from "sonner";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { listBags } from "@cdd/app/_actions/bag/list-bags";
import BagsTable from "./components/BagsTable";
import { useGetLocalStorage } from "@cdd/app/hooks/useGetLocalStorage";

export default function Home() {
  const [page, setPage] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);

  const backPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const nextPage = async () => {
    if (!hasNextPage) return;

    const cycle = useGetLocalStorage('selected-cycle')

    if(!cycle){
      toast.error("Selecione um ciclo para montar uma sacola!")
      return
    }

    const { id } = cycle;

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
      <div className="flex flex-col h-[18%] w-full items-center justify-end mt-4">
        <h1 className="text-3xl font-medium text-slate-gray mb-4 text-center">Montar sacolas</h1>
        <span className="text-sm font-medium text-slate-gray mb-6 text-center">
          Monte as sacolas abaixo
        </span>
      </div>
      <div className="w-full h-[72%] overflow-y-auto">
        <BagsTable page={page} />
      </div>
      <div className="w-full h-[10%] flex justify-center items-end">
        <div className="gap-4 flex">
          <button onClick={backPage}>
            <IoIosArrowBack />
          </button>
          {page}
          <button onClick={nextPage}>
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </div>
  );
}
