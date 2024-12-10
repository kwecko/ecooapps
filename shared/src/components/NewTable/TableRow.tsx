import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface TableRowProps extends React.TdHTMLAttributes<HTMLTableRowElement> {
  children: ReactNode;
  className?: string;
}

export default function TableRow({ children, ...rest }: TableRowProps) {
  return (
    <tr
      {...rest}
      className={twMerge(
        "bg-white hover:bg-gray-100 transition-colors lg:border-b lg:border-theme-secondary lg:last:border-0",
        rest.className
      )}
    >
      {children}
    </tr>
  );
}
