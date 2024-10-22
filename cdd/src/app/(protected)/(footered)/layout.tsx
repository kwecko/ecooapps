"use client"

import Footer from "@shared/components/Footer";
import { CycleProvider } from "@shared/context/cycle";

export default function LayoutWithFooter({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CycleProvider>
      <div className="flex flex-col justify-between w-full bg-theme-background h-[100vh]">
        <div className="h-[var(--min-page-height)] overflow-y-auto">
          {children}
        </div>
        <div className="h-[var(--footer-height)]">
          <Footer
            appID={"CDD"}
          />
        </div>
      </div>
    </CycleProvider>
  );
}
