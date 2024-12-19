"use client";

import Title from "@admin/app/components/Title";
import ListFarmsTable from "./components/ListFarmsTable";

export default function Page() {
  return (
    <div className="w-full flex flex-col h-full gap-6 overflow-y-hidden items-center relative">
      <Title className="lg:absolute lg:left-0">Produtores</Title>
      <ListFarmsTable />
    </div>
  );
}
