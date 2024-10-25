"use client";

import { useState } from "react";
import { FarmWithOrdersTable } from "./components/FarmWithOrdersTable";

import { ModelPage } from "@shared/components/ModelPage";
import PagingButton from "@shared/components/PagingButton";
import { ModelPage } from "@shared/components/ModelPage";

export default function Home() {
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const backPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const nextPage = () => {
    if(totalItems <= 20){
      return;
    }

    setPage((prev) => prev + 1);
  };

  return (
    <ModelPage
      title="Lista de ofertas"
      titleGap="gap-2"
      subtitle="Aprove ou rejeite as ofertas abaixo:"
    >
      <div className="w-full h-full flex flex-col justify-between items-center">
        <FarmWithOrdersTable page={page} setTotalItems={setTotalItems} />
        <PagingButton value={page} nextPage={nextPage} backPage={backPage} />
      </div>
    </ModelPage>
  );
}
