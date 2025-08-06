"use client";

import SendBagTable from "./components/SendBagTable";

import { ModelPage } from "@shared/components/ModelPage";

export default function Home() {
  return (
    <ModelPage
      title="Destinar sacolas"
      titleGap="gap-2"
      subtitle="Destine as sacolas abaixo"
      overflowAuto={true}
    >
      <SendBagTable />
    </ModelPage>
  );
}
