"use client";

import { ModelPage } from "@shared/components/ModelPage";
import BagMiniTable from "./components/BagMiniTable";

export default async function Home() {
  return (
    <ModelPage
      title="Conteúdo da sacola"
      titleGap="gap-2"
      titleClassName="px-0"
      subtitle="Monte a sacola abaixo e, após concluir, marque como pronta"
      subtitleClassName="px-6"
      overflowAuto
    >
      <div className="w-full h-[82%] overflow-y-auto">
        <BagMiniTable />
      </div>
    </ModelPage>
  );
}
