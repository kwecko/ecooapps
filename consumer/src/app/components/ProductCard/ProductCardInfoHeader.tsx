import React, { ReactNode } from "react";

interface ProductCardInfoHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function ProductCardInfoHeader({
  children,
  ...rest
}: ProductCardInfoHeaderProps) {
  return (
    <div className="w-full flex flex-col" {...rest}>
      {children}
    </div>
  );
}
