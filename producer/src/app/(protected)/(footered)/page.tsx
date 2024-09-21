'use client'

import React from 'react';
import { CycleProvider } from "@shared/context";
import CycloInformation from "./home/components/CycloInformation";
import { Header } from "./home/components/Header";
import { PendingDeliveries } from "./home/components/PendingDeliveries";
import { ProductMenu } from "./home/components/ProductMenu";
import SelectCycle from "@shared/components/SelectCycle";

export default function Home() {
  const FourItems = 4;

  return (
    <CycleProvider>
      <div className="px-4 h-[var(--min-page-height)] flex flex-col justify-start items-center gap-5 text-theme-default">
        <Header />
        <SelectCycle />
        <CycloInformation />
        <ProductMenu />
        <PendingDeliveries numberOfItems={FourItems} />
      </div>
    </CycleProvider>
  );
}
