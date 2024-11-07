"use client";

import React from "react";
import { twMerge } from "tailwind-merge";

interface ConfirmationPageProps {
  title?: React.ReactNode;
  titleClassName?: string;
  titleGap?: string;
  subtitle?: React.ReactNode;
  subtitleClassName?: string;
  buttonArea?: React.ReactNode;
  children?: React.ReactNode;
  overflowAuto?: boolean
}

export function ModelPage({
  title,
  titleClassName,
  titleGap,
  subtitle,
  subtitleClassName,
  buttonArea,
  children,
  overflowAuto
}: ConfirmationPageProps): React.JSX.Element {
  const overflow = overflowAuto ? 'overflow-y-auto' : "overflow-hidden"

  return (
    <div className={twMerge("w-full h-[inherit] shrink-0 p-4 pt-5 pb-4 flex flex-col justify-stretch items-center gap-4 text-theme-default overflow-hidden bg-theme-background ", overflow)}>
      {title && (
        <div
          className={twMerge(
            "flex flex-col items-center w-full justify-between gap-5 shrink-0 grow-0",
            titleGap
          )}
        >
          <h1
            className={twMerge(
              "pt-12 px-12 text-3xl leading-8.5 text-center font-medium",
              titleClassName
            )}
          >
            {title}
          </h1>
          {subtitle && (
            <h2 className={twMerge("pb-0 px-8 text-sm font-medium text-center",subtitleClassName)}>
              {subtitle}
            </h2>
          )}
        </div>
      )}

      {children && children}

      {buttonArea && <div className="w-full pb-8.5">{buttonArea}</div>}
    </div>
  );
}
