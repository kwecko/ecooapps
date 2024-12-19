import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface CardProps {
  className?: string;
  children?: ReactNode;
}

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={twMerge(
        "w-full h-fit pl-3 pr-4 rounded-2xl bg-white flex flex-col justify-around",
        className
      )}
    >
      {children}
    </div>
  );
}
