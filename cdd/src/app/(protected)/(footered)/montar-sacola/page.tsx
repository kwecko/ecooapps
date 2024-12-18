"use client";

import BagsTable from "./components/BagsTable";

import { ModelPage } from "@shared/components/ModelPage";

export default function Home() {
  return (
    <ModelPage
      title="Montar sacolas"
      titleGap="gap-2"
      subtitle="Monte as sacolas abaixo"
      overflowAuto
    >
      <BagsTable />
    </ModelPage>
  );
}
