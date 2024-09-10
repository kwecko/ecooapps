'use client'

import React from 'react';
import { CycleProvider } from "@shared/context";
import CycloInformaiton from "./home/components/CycloInformation";
import { Header } from "./home/components/Header";
import { PendingDeliveries } from "./home/components/PendingDeliveries";
import { ProductMenu } from "./home/components/ProductMenu";
import SelectCycle from "@shared/components/SelectCycle";

export default function Home() {
  const FourItems = 4;

  return (
    <div className="px-4 pb-10 pt-10 h-[var(--min-page-height)]">
      <CycleProvider>
        <div>
          <Header />
          <SelectCycle />
          <CycloInformaiton />
          <ProductMenu />
          <PendingDeliveries numberOfItems={FourItems} />
        </div>
      </CycleProvider>
    </div>
  );
}
