import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import styles from "./MiniTable.module.css";

interface MiniTableRootProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
}

export default function MiniTableRoot({ children, className, ...rest }: MiniTableRootProps) {
  return (
    <div
      {...rest}
      className={twMerge("w-full h-full overflow-y-auto rounded-xl", className)}>
      <table
        className={`${styles.table} p-2 pt-1 text-[#545F71] w-full self-center`}
      >
        {children}
      </table>
    </div>
  );
}
