import React, { ReactNode } from "react";

interface ProductCardRootProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
}

export default function ProductCardRoot({
  children,
  className,
  ...rest
}: ProductCardRootProps) {
  return (
    <div className="w-full bg-[rgb(246,246,246)] flex flex-col rounded-2xl justify-start p-2.5 items-start">
      {children}
    </div>
  );
}
