import React, { ReactNode } from "react";

interface MiniTableBodyProps {
  children: ReactNode;
}

export default function MiniTableBody({ children }: MiniTableBodyProps) {
  return <tbody className="flex flex-col gap-px w-full">{children}</tbody>;
}
