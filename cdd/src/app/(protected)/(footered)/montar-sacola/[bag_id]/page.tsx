"use client"

import BagMiniTable from "./components/BagMiniTable";

export default async function Home() {
  return (
    <div className="w-full h-full p-5 pb-6 flex items-center flex-col">
      <div className="flex flex-col h-[18%] w-full items-center justify-end mt-4">
        <h1 className="text-3xl font-medium text-slate-gray mb-4 text-center">Conteúdo da sacola</h1>
        <span className="text-sm font-medium text-slate-gray mb-6 text-center">
          Monte a sacola abaixo e, após concluir, < br/> marque como pronta
        </span>
      </div>
      <div className="w-full h-[82%] overflow-y-auto">
        <BagMiniTable />
      </div>
    </div>
  );
}
