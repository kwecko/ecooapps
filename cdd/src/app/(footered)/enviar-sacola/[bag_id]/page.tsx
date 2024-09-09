"use client"

import SendBagMiniTable from "./components/SendBagMiniTable";

export default async function Home() {
  return (
    <div className="w-full h-full p-5 pb-6 flex items-center flex-col">
      <div className="flex flex-col h-[18%] w-full items-center justify-end mt-4">
        <h1 className="text-3xl font-medium text-slate-gray mb-4 text-center">Conteúdo da sacola</h1>
        <span className="text-sm font-medium text-slate-gray mb-6 text-center">
          Marque a sacola como enviada assim que < br/> ela estiver a caminho do cliente
        </span>
      </div>
      <div className="w-full h-[82%] overflow-y-auto">
        <SendBagMiniTable />
      </div>
    </div>
  );
}
