"use client";

import Title from "@admin/app/components/Title";
import ListBagsTable from "./components/ListBagsTable";

export default function Page() {
  return (
    <div className="w-full flex flex-col h-full gap-6 overflow-y-hidden items-center relative">
      <Title className="lg:absolute lg:left-0">Consumidores</Title>
      <ListBagsTable />
    </div>
  );
}
