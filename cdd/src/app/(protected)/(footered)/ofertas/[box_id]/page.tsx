"use client";

import FarmOrdersTable from "./components/FarmOrdersTable";

export default function Home() {
  return (
    <div className="w-full h-full p-5 pb-6 flex items-center flex-col">
      <div className="flex flex-col w-full items-center justify-end mt-4">
        <h1 className="text-3xl font-medium text-slate-gray mb-4 text-center">Verificar oferta</h1>
        <span className="text-sm font-medium text-slate-gray mb-6 text-center">
          Confira os dados abaixo:
        </span>
      </div>
      <div className="w-full flex-1 overflow-y-auto">
        <FarmOrdersTable />
      </div>
    </div>
  );
}
