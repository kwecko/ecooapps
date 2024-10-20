"use client"

import { useState } from "react";

import { ModelPage } from "@shared/components/ModelPage";
import PagingButton from "@shared/components/PagingButton";

export default function Home(){
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const backPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const nextPage = () => {

  }

  return (
    <ModelPage
      title="Produtores"
      subtitle="Aprove ou rejeite Produtores"
      titleGap="gap-2"
      overflowAuto={true}
    >
      <div className="w-full h-full flex flex-col justify-between">
        
        <PagingButton value={page} nextPage={nextPage} backPage={backPage} />
      </div>
    </ModelPage>
  )
}