import React, { ReactNode } from "react";

interface ProductCardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
}

export default function ProductCardHeader({
  children,
  className,
  ...rest
}: ProductCardHeaderProps) {
  return (
    <div className="w-full flex justify-between items-center">{children}</div>
  );
}
