"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ComponentPropsWithRef } from "react";
import { HiOutlineChevronRight } from "react-icons/hi";
import { twMerge } from "tailwind-merge";

type LinkProps = ComponentPropsWithRef<typeof Link> & {
  icon?: React.ReactNode;
  children: React.ReactNode;
};

type DivProps = React.HTMLAttributes<HTMLDivElement> & {
  icon?: React.ReactNode;
  children: React.ReactNode;
};

type NavlinkProps = LinkProps | DivProps;

const SelectedClassname =
  "bg-theme-highlight font-semibold text-white hover:translate-x-0 group-hover:translate-x-0";
const HoverClassname = "hover:font-semibold";

export default function Navlink(props: NavlinkProps) {
  const { icon, children, ...rest } = props;
  const pathname = usePathname();

  const isLink = "href" in rest;
  const isSelected = isLink && rest.href === pathname;

  const selectedClassname = isSelected && SelectedClassname;
  const hoverClassname = (!isSelected || !isLink) && HoverClassname;

  const commonClasses = twMerge(
    "group w-full font-inter font-normal text-base tracking-tight-2 leading-[1.375rem] p-[0.9375rem] pr-2 rounded-lg text-white flex items-end transition-all duration-150 ease-in-out hover:translate-x-1 hover:cursor-pointer",
    rest.className,
    selectedClassname,
    hoverClassname
  );

  if (isLink) {
    const linkProps = rest as LinkProps;
    return (
      <Link {...linkProps} className={commonClasses}>
        {icon && (
          <span className="self-center text-2xl mr-6 font-bold">{icon}</span>
        )}
        {children}
        <HiOutlineChevronRight
          className={twMerge(
            "text-xl ml-auto text-theme-highlight transition-transform duration-300 ease-in-out group-hover:translate-x-1.5 group-hover:text-white",
            selectedClassname
          )}
        />
      </Link>
    );
  } else {
    const divProps = rest as DivProps;
    return (
      <div {...divProps} className={commonClasses}>
        {icon && (
          <span className="self-center text-2xl mr-6 font-bold">{icon}</span>
        )}
        {children}
        <HiOutlineChevronRight
          className={twMerge(
            "text-xl ml-auto text-theme-highlight transition-transform duration-300 ease-in-out group-hover:translate-x-1.5 group-hover:text-white",
            selectedClassname
          )}
        />
      </div>
    );
  }
}
