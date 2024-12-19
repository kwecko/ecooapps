"use client";

import SelectCycle from "@shared/components/SelectCycle";
import CardComponent from "./home/components/CardComponent";
import { Header } from "./home/components/Header";
import { contentLinksHomePage } from "./home/data";

export default function Cdd() {
  return (
    <div className="px-4 pt-9.5 h-footered-page overflow-y-auto">
      <div className="flex flex-col gap-3.25">
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
          );
        })}
      </div>
    </div>
  );
}
