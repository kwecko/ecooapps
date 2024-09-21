import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface MiniTableHeaderCellProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  className?: string;
  children: ReactNode;
}

export default function MiniTableHeaderCell({ children,
  className,
  ...rest }: MiniTableHeaderCellProps) {
  return (
    <th
      {...rest}
      className={twMerge("text-left font-normal", className)}
    >
      {children}
    </th>
  );
}