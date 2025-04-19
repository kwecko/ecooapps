import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface MiniTableRowProps
  extends React.TdHTMLAttributes<HTMLTableRowElement> {
  children: ReactNode;
}

export default function MiniTableRow({ children, ...rest }: MiniTableRowProps) {
  return (
    <tr
      {...rest}
      className={twMerge(
        "px-2 py-2.5 text-primary text-base font-normal leading-5.5 tracking-tight-2 bg-white font-inter",
        rest.className
      )}
    >
      {children}
    </tr>
  );
}
