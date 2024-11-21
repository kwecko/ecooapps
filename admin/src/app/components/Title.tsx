import React from "react";

interface TitleProps {
  children: React.ReactNode;
}

export default function Title({ children }: TitleProps) {
  return (
    <h1 className="font-poppins text-slate-blue font-semibold text-4.25xl leading-12.5 w-112">
      {children}
    </h1>
  );
}
