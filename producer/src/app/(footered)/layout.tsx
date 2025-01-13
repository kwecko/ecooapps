"use client";

import Footer from "@shared/components/Footer";

export function LayoutWithFooter({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-between w-full bg-theme-background h-inherit">
      <div className="h-footered-page overflow-y-auto">{children}</div>
      <div className="h-footer">
        <Footer appID={"PRODUCER"} />
      </div>
    </div>
  );
}

export default LayoutWithFooter;
