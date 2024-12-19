"use client";

import SelectCycle from "@shared/components/SelectCycle";
import CycloInformation from "./home/components/CycloInformation";
import { Header } from "./home/components/Header";
import { PendingDeliveries } from "./home/components/PendingDeliveries";
import { ProductMenu } from "./home/components/ProductMenu";

export default function Home() {
  return (
    <div className="px-4 pt-9.5 h-full flex flex-col gap-5 overflow-y-auto">
      <Header />
      <SelectCycle />
      <CycloInformation />
      <ProductMenu />
      <PendingDeliveries />
    </div>
  );
}
