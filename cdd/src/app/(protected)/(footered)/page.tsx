"use client";

import SelectCycle from "@cdd/components/SelectCycle";

import { Header } from "./home/components/Header";
import CardComponent from "./home/components/CardComponent";
import { contentLinksHomePage } from "./home/data";

export default function Cdd() {
  return (
    <div className="px-4 pb-10 pt-10 h-[var(--min-page-height)]">
      <Header />
      <div>
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
