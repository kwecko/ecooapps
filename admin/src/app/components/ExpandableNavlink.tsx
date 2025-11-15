"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { HiOutlineChevronDown, HiOutlineChevronRight } from "react-icons/hi";
import { twMerge } from "tailwind-merge";

interface SubItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

interface ExpandableNavlinkProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  subItems: SubItem[];
}

export default function ExpandableNavlink({
  href,
  icon,
  children,
  subItems,
}: ExpandableNavlinkProps) {
  const pathname = usePathname();
  const isInSection = pathname?.startsWith(href);
  
  const marketIdMatch = pathname?.match(/\/feiras-do-dia\/([^\/]+)\//);
  const hasMarketId = !!marketIdMatch;
  const shouldExpand = isInSection && hasMarketId;
  
  const [isExpanded, setIsExpanded] = useState(shouldExpand);

  useEffect(() => {
    setIsExpanded(shouldExpand);
  }, [shouldExpand]);

  const isSelected = pathname === href;
  const hasSelectedSubItem = subItems.some((item) => {
    if (item.href.includes('[market_id]') && marketIdMatch) {
      const marketId = marketIdMatch[1];
      const dynamicHref = item.href.replace('[market_id]', marketId);
      return pathname === dynamicHref;
    }
    return pathname === item.href;
  });

  const selectedClassname =
    (isSelected || hasSelectedSubItem) &&
    "bg-theme-highlight font-semibold text-white hover:translate-x-0 group-hover:translate-x-0";
  const hoverClassname = !isSelected && !hasSelectedSubItem && "hover:font-semibold";

  return (
    <div className="w-full">
      <div
        className={twMerge(
          "group w-full font-inter font-normal text-base tracking-tight-2 leading-[1.375rem] p-[0.9375rem] pr-2 rounded-lg text-white flex items-end transition-all duration-150 ease-in-out",
          selectedClassname,
          hoverClassname
        )}
      >
        {icon && (
          <span className="self-center text-2xl mr-6 font-bold">{icon}</span>
        )}
        <Link
          href={href}
          className="flex-1 hover:cursor-pointer"
        >
          {children}
        </Link>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (hasMarketId) {
              setIsExpanded(!isExpanded);
            }
          }}
          className="cursor-pointer ml-auto"
        >
          <div className="relative w-5 h-5">
            {hasMarketId ? (
              <>
                <HiOutlineChevronDown
                  className={twMerge(
                    "text-xl text-theme-highlight transition-all duration-300 ease-in-out group-hover:text-white absolute",
                    selectedClassname,
                    isExpanded
                      ? "opacity-100 rotate-0"
                      : "opacity-0 rotate-90"
                  )}
                />
                <HiOutlineChevronRight
                  className={twMerge(
                    "text-xl text-theme-highlight transition-all duration-300 ease-in-out group-hover:translate-x-1.5 group-hover:text-white absolute",
                    selectedClassname,
                    isExpanded
                      ? "opacity-0 -rotate-90"
                      : "opacity-100 rotate-0"
                  )}
                />
              </>
            ) : (
              <HiOutlineChevronRight
                className={twMerge(
                  "text-xl text-theme-highlight transition-all duration-300 ease-in-out group-hover:translate-x-1.5 group-hover:text-white",
                  selectedClassname
                )}
              />
            )}
          </div>
        </button>
      </div>
      {isExpanded && marketIdMatch && (
        <div className="ml-4 mt-1 flex flex-col gap-1">
          {subItems.map((subItem) => {
            const marketId = marketIdMatch[1];
            const finalHref = subItem.href.replace('[market_id]', marketId);
            const isSubSelected = pathname === finalHref;
            
            return (
              <Link
                key={subItem.href}
                href={finalHref}
                className={twMerge(
                  "group w-full font-inter font-normal text-sm tracking-tight-2 leading-[1.375rem] p-[0.75rem] pr-2 rounded-lg text-white flex items-end transition-all duration-150 ease-in-out hover:translate-x-1 hover:cursor-pointer",
                  isSubSelected
                    ? "bg-theme-highlight font-semibold text-white hover:translate-x-0"
                    : "hover:font-semibold"
                )}
              >
                {subItem.icon && (
                  <span className="self-center text-xl mr-4 font-bold">
                    {subItem.icon}
                  </span>
                )}
                <span className="flex-1">{subItem.label}</span>
                <HiOutlineChevronRight
                  className={twMerge(
                    "text-lg ml-auto text-theme-highlight transition-transform duration-300 ease-in-out group-hover:translate-x-1.5 group-hover:text-white",
                    isSubSelected && "text-white"
                  )}
                />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

