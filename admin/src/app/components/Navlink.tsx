"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentPropsWithRef } from "react";
import { HiOutlineChevronRight } from "react-icons/hi";
import { twMerge } from "tailwind-merge";

type NavlinkProps = ComponentPropsWithRef<typeof Link> & {
  icon?: React.ReactNode;
};

export default function Navlink({ icon, children, ...rest }: NavlinkProps) {
  const pathname = usePathname();

  const selectedClassname =
    rest.href === pathname &&
    "bg-theme-highlight font-semibold text-white hover:translate-x-0 group-hover:translate-x-0";
  const hoverClassname = rest.href !== pathname && "hover:font-semibold";

  return (
    <Link
      {...rest}
      className={twMerge(
        "group w-full font-inter font-normal text-base tracking-tight-2 leading-5.5 p-3.75 pr-2 rounded-lg text-white flex items-end transition-all duration-150 ease-in-out hover:translate-x-1",
        rest.className,
        selectedClassname,
        hoverClassname
      )}
    >
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
}
