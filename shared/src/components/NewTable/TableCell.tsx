import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
  className?: string;
}

export default function TableCell({ children, ...rest }: TableCellProps) {
  return (
    <td
      {...rest}
      className={twMerge(
        "flex justify-center items-center text-base leading-5.5 tracking-tight-2 font-normal text-theme-primary overflow-x-hidden lg:justify-start lg:pl-4",
        rest.className
      )}
    >
      <div className="truncate">{children}</div>
    </td>
  );
}
