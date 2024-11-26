'use client'

import React from 'react';
// import CycloInformation from "./home/components/CycloInformation";
// import { Header } from "./home/components/Header";
import { PendingDeliveries } from "./home/components/PendingDeliveries";
// import { ProductMenu } from "./home/components/ProductMenu";
// import SelectCycle from "@shared/components/SelectCycle";

export default function Home() {

  return (
    <div className="px-4 pb-10 pt-10 h-[var(--min-page-height)]">
      <div className='flex flex-col gap-5'>
        {/* <Header />
        <SelectCycle />
        <CycloInformation />
        <ProductMenu /> */}
        <PendingDeliveries />
      </div>
      <h1>Bem vindo</h1>
    </div>
  );
}
