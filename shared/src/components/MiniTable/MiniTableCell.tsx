import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface MiniTableCellProps
  extends React.TdHTMLAttributes<HTMLTableCellElement> {
  className?: string;
  children: ReactNode;
}

export default function MiniTableCell({
  children,
  className,
  ...rest
}: MiniTableCellProps) {
  return (
    <td
      {...rest}
      className={twMerge(
        "max-w-max w-full break-words overflow-y-auto overflow-x-hidden",
        className
      )}
    >
      {children}
    </td>
  );
}