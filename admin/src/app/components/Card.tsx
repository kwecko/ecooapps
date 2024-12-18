import React, { ReactNode } from 'react';

interface CardProps {
  title: string;
  className?: string;
  size?: string;
  children?: ReactNode;
}

export default function Card({ title, children, className, size }: CardProps) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="pl-6 font-semibold">{title}</h1>
      <div className={`flex flex-col bg-white rounded-2xl p-5 gap-1 ${size}`}>
        {children}
      </div>
    </div>
  );
}