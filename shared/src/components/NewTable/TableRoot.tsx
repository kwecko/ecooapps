import React, { HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import styles from "./Table.module.css";

interface TableRootProps extends HTMLAttributes<HTMLTableElement> {
  children: ReactNode;
  className?: string;
}

export default function TableRoot({ children, ...rest }: TableRootProps) {
  return (
    <table
      {...rest}
      className={twMerge(
        styles.table,
        "w-full font-inter text-center overflow-x-hidden",
        rest.className
      )}
    >
      {children}
    </table>
  );
}
