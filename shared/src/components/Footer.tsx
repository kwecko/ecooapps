"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { LuChevronLeft } from "react-icons/lu";
import { getFooteredPageInfo } from "@shared/utils/data/footered-pages-info";
import InfoModal from "@shared/components/InfoModal";

import Button from "./Button";

export default function Footer({
  appID,
}: {
  appID: string;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const convertPathname = (path: string) => {
    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    
    return path
      .split("/")
      .map((segment) => 
        uuidRegex.test(segment) ? "[id]" : segment
      )
      .join("/");
  };
  

  const convertedPathname = convertPathname(pathname);

  const footerPageInfo = getFooteredPageInfo(appID)[convertedPathname];

  if(!footerPageInfo) {
    throw new Error("Error when fetching footer information");
  }

  const { hasPreviousPage, returnPath, hasHelpButton, helpInfo } = footerPageInfo;

  if (!hasPreviousPage && !hasHelpButton) {
    throw new Error("Footer component must have at least one button");
  }

  if (hasPreviousPage && !returnPath) {
    throw new Error("Footer component must have a return path if hasPreviousPage is true");
  }

  if (hasHelpButton && !helpInfo) {
    throw new Error("Footer component must have help info if hasHelpButton is true");
  }

  const handleReturn = () => {
    if (returnPath) {
      router.push(returnPath);
    } else {
      router.back();
    }
  };

  const ReturnButton = () => (
    <Link href={returnPath ? returnPath : "#"} className="flex items-center">
      <LuChevronLeft
        className="w-7.5 h-7.5 text-theme-default"
      />
      <Button
        className={
          "flex items-center gap-2 text-sm font-medium text-theme-default w-auto"
        }
        onClick={handleReturn}
      >
        Voltar
      </Button>
    </Link>
  );

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  }

  const HelpButton = () => (
    <InfoModal
      titleContentModal={helpInfo?.title || ""}
      contentModal={helpInfo?.content || ""}
      icon="?"
      titleCloseModal={helpInfo?.closeButtonText || ""}
      buttonOpenModal={
        <button className="z-10 flex items-center gap-2 bg-theme-default w-12.5 h-12.5 rounded-full justify-center text-white text-3xl leading-5.5 font-normal self-center" onClick={handleOpenModal}>
          ?
        </button>
      }
      isOpen={isModalOpen}
      setIsOpen={setIsModalOpen}
    />
  );

  function justify() {
    if (hasPreviousPage && hasHelpButton) {
      return "justify-between";
    } else if (hasPreviousPage) {
      return "justify-start";
    } else if (hasHelpButton) {
      return "justify-end";
    }
  }

  return (
    <>
      {hasPreviousPage || hasHelpButton ? (
        <div
          className={`flex w-full items-center ${justify()} w-full p-5
          static bottom-0 h-[var(--footer-height)] bg-theme-background z-50
          `}
        >
          {hasPreviousPage && <ReturnButton />}
          {hasHelpButton && <HelpButton />}
        </div>
      ) : null}
    </>
  );
}
