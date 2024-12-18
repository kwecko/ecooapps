"use client";

import SendBagTable from "./components/SendBagTable";

import { ModelPage } from "@shared/components/ModelPage";

export default function Home() {
  return (
    <ModelPage
      title="Enviar sacolas"
      titleGap="gap-2"
      subtitle="Envie as sacolas abaixo"
      overflowAuto={true}
    >
      <SendBagTable />
    </ModelPage>
  );
}
