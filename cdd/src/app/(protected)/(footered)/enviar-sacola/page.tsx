"use client";

import { useState } from "react";
import SendBagTable from "./components/SendBagTable";

import PagingButton from "@shared/components/PagingButton";
import { ModelPage } from "@shared/components/ModelPage";

export default function Home() {
  const [page, setPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState(0);

  const backPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const nextPage = async () => {
    if(totalItems < 20){
      return;
    }

    setPage((prev) => prev + 1);
  };

  return (
    <ModelPage
      title="Enviar sacolas"
      titleGap="gap-2"
      subtitle="Envie as sacolas abaixo"
      overflowAuto={true}
    >
      <div className="w-full h-full flex flex-col justify-between items-center">
        <SendBagTable page={page} setTotalItems={setTotalItems} />
        <PagingButton value={page} nextPage={nextPage} backPage={backPage} />
      </div>
    </ModelPage>
  );
}
