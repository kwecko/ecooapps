"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { IoIosHelp } from "react-icons/io";
import { LuChevronLeft } from "react-icons/lu";
import { twMerge } from "tailwind-merge";
import { getFooteredPageInfo } from "@shared/utils/data/footered-pages-info";
import InfoModal from "@shared/components/InfoModal";

import Button from "./Button";

export default function Footer({
  appID,
  bgColor,
}: {
  appID: string;
  bgColor: string;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const convertPathname = (path: string) => {
    return path
      .split("/")
      .map((segment) =>
        isNaN(Number(segment)) || segment === "" ? segment : "[id]"
      )
      .join("/");
  };

  const convertedPathname = convertPathname(pathname);

  const { hasPreviousPage, returnPath, hasHelpButton, helpInfo } =
    getFooteredPageInfo(appID)[convertedPathname];

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
        style={{ color: bgColor }}
        className={"w-[30px] h-[30px]"}
      />
      <Button
        className={
          "flex items-center gap-2 text-sm font-medium text-[${bgColor}] w-auto"
        }
        onClick={handleReturn}
        style={{ color: bgColor }}
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
      titleOpenModal="Ajuda"
      titleContentModal={helpInfo.title}
      contentModal={helpInfo.content}
      titleCloseModal={helpInfo.closeButtonText}
      bgOpenModal={bgColor}
      bgCloseModal={bgColor}
      isOpen={isModalOpen}
      setIsOpen={setIsModalOpen}
      buttonOpenModal={
        <button className="flex items-center gap-2 bg-theme-default w-12.5 h-12.5 rounded-full mb-6 justify-center text-white text-3xl leading-5.5 font-normal self-center" onClick={handleOpenModal}>
          ?
        </button>
      }
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
