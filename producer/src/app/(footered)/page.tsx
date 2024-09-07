'use client'

import React from 'react';
import { CycleProvider } from "@shared/context";
import CycloInformaiton from "./home/components/CycloInformation";
import { Header } from "./home/components/Header";
import { PendingDeliveries } from "./home/components/PendingDeliveries";
import { ProductMenu } from "./home/components/ProductMenu";
import SelectCycle from "@shared/components/SelectCycle";

export default function Home() {

  return (
    <div className="px-8 pb-10 pt-10">
      <CycleProvider>
        <div>
          <Header />
          <SelectCycle />
          <CycloInformaiton />
          <ProductMenu />
          <PendingDeliveries />
        </div>
      </CycleProvider>
    </div>
  );
}
