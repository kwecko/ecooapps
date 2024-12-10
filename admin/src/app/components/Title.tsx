import React from "react";
import { twMerge } from "tailwind-merge";

interface TitleProps {
  children: React.ReactNode;
  className?: string;
}

export default function Title({ children, className }: TitleProps) {
  return (
    <h1
      className={twMerge(
        "font-poppins text-slate-blue font-semibold text-4.25xl leading-12.5 w-112",
        className
      )}
    >
      {children}
    </h1>
  );
}
