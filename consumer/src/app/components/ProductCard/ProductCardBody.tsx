import React, { ReactNode } from "react";

interface ProductCardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
}

export default function ProductCardBody({
  children,
  className,
  ...rest
}: ProductCardBodyProps) {
  return (
    <div className="grid grid-cols-7 gap-x-10" {...rest}>
      {children}
    </div>
  );
}
