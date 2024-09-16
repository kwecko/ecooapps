import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface MiniTableCellProps
  extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
}

export default function MiniTableCell({
  children,
  ...rest
}: MiniTableCellProps) {
  return (
    <td
      {...rest}
      className={twMerge("font-normal max-w-max", rest.className)}
    >
      {children}
    </td>
  );
}
