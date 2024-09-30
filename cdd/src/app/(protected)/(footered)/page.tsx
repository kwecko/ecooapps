"use client";

import { Header } from "./home/components/Header";
import CardComponent from "./home/components/CardComponent";
import { contentLinksHomePage } from "./home/data";
import SelectCycle from "@shared/components/SelectCycle"

export default function Cdd() {
  return (
    <div className="px-4 pb-10 pt-10 h-[var(--min-page-height)]">
      <div className="flex flex-col gap-5">
        <Header />
        <SelectCycle />
        {contentLinksHomePage.map((content) => {
          return (
            <CardComponent
              key={content.link}  
              hasNotification={content.hasNotification}
              isSelectedCycle={content.isSelectedCycle}
              title={content.title}
              link={content.link}
              disabled={content.disabled}
            />
          )
        })}
      </div>
    </div>
  );
}
