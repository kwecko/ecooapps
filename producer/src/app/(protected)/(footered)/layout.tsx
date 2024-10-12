"use client"

import Footer from "@shared/components/Footer";
import { CycleProvider } from "@shared/context/cycle";

const HAS_PREVIOUS_PAGE = {
  "/": false,
  "/login": true,
  "/oferta": true,
  "/em-construcao": true,
};

const HAS_HELP_BUTTON = {
  "/": true,
  "/login": false,
  "/oferta": true,
  "/em-construcao": false,
};

const RETURN_URLS = {
  "/telegram": '/login',
  "/login": "/inicio",
  "/oferta": "/",
  "/em-construcao": "/",
};

export default function LayoutWithFooter({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CycleProvider>
      <div className="flex flex-col justify-between w-full bg-theme-background">
        <div className="h-[var(--min-page-height)] overflow-y-auto">
          {children}
        </div>
        <div className="h-[var(--footer-height)]">
          <Footer
            hasPreviousPagePaths={HAS_PREVIOUS_PAGE}
            hasHelpButtonPaths={HAS_HELP_BUTTON}
            bgColor={"#2F4A4D"}
            returnUrls={RETURN_URLS}
          />
        </div>
      </div>
    </CycleProvider>
  );
}