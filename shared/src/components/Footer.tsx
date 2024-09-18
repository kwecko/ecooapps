"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { IoIosHelp } from "react-icons/io";
import { LuChevronLeft } from "react-icons/lu";
import { twMerge } from "tailwind-merge";

import Button from "./Button";

export default function Footer({
  hasPreviousPagePaths,
  hasHelpButtonPaths,
  bgColor,
  returnUrls,
}: {
  hasPreviousPagePaths: Record<string, boolean>;
  hasHelpButtonPaths: Record<string, boolean>;
  bgColor: string;
  returnUrls: Record<string, string>;
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

  const hasPreviousPage =
    hasPreviousPagePaths[convertedPathname] !== undefined
      ? hasPreviousPagePaths[convertedPathname]
      : true;

  const hasHelpButton =
    hasHelpButtonPaths[convertedPathname] !== undefined
      ? hasHelpButtonPaths[convertedPathname]
      : true;

  const returnUrl = returnUrls[convertedPathname];

  const handleReturn = () => {
    if (returnUrl) {
      router.push(returnUrl);
    } else {
      router.back();
    }
  };

  const ReturnButton = () => (
    <Link href={returnUrl ? returnUrl : "#"} className="flex items-center">
      <LuChevronLeft style={{ color: bgColor }} className={"w-[30px] h-[30px]"} />
      <Button
        className={"flex items-center gap-2 text-sm font-medium text-[${bgColor}] w-auto"}
        onClick={handleReturn}
        style={{ color: bgColor }}
      >
        Voltar
      </Button>
    </Link>
  );

  const HelpButton = () => (
    <IoIosHelp
      className="w-[50px] h-[50px] rounded-full border-0 text-white mb-6"
      style={{ backgroundColor: bgColor }}
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
