import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface TableHeaderCellProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
  className?: string;
}

export default function TableHeaderCell({
  children,
  ...rest
}: TableHeaderCellProps) {
  return (
    <th
      {...rest}
      className={twMerge(
        "flex flex-col justify-center items-center h-11.5 font-semibold text-xs lg:text-base lg:text-theme-primary lg:leading-5.5 lg:items-start lg:pl-4",
        rest.className
      )}
    >
      <div className="">{children}</div>
    </th>
  );
}
