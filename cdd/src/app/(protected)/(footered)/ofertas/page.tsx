"use client";

import { FarmWithOrdersTable } from "./components/FarmWithOrdersTable";

import { ModelPage } from "@shared/components/ModelPage";

export default function Home() {
  return (
    <ModelPage
      title="Lista de ofertas"
      titleGap="gap-2"
      subtitle="Aprove ou rejeite as ofertas abaixo:"
    >
      <FarmWithOrdersTable />
    </ModelPage>
  );
}
