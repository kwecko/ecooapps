import React, { ReactNode } from "react";

interface ProductCardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
}

export default function ProductCardFooter({
  children,
  className,
  ...rest
}: ProductCardFooterProps) {
  return (
    <>
      <hr className="w-full bg-french-gray h-px my-2" />
      <div className="w-full flex flex-row justify-between items-center gap-3">
        {children}
      </div>
    </>
  );
}
