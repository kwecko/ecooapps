"use client";

import Footer from "@shared/components/Footer";
import { CycleProvider } from "@shared/context/cycle";

export default function LayoutWithFooter({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CycleProvider>
      <div className="flex flex-col justify-between w-full bg-theme-background h-full-dvh">
        <div className="h-footered-page overflow-y-auto">{children}</div>
        <Footer appID={"CDD"} />
      </div>
    </CycleProvider>
  );
}
