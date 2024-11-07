"use client";

import { ModelPage } from "@shared/components/ModelPage";
import FarmOrdersTable from "./components/page";

export default function Home() {
  return (
    <ModelPage
      title="Verificar oferta"
      titleGap="gap-2"
      subtitle="Confira os dados abaixo:"
      overflowAuto={true}
    >
      <div className="w-full h-[82%] overflow-y-auto">
        <FarmOrdersTable />
      </div>
    </ModelPage>
  );
}
