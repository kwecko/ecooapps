import React, { ReactNode } from "react";

interface ProductCardInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function ProductCardInfo({
  children,
  ...rest
}: ProductCardInfoProps) {
  return (
    <div className="flex flex-col justify-between col-span-5" {...rest}>
      {children}
    </div>
  );
}
