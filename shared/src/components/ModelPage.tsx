"use client";

import React from "react";
import { twMerge } from "tailwind-merge";

interface ConfirmationPageProps {
  title?: string;
  titleClassName?: string;
  titleGap?: string;
  subtitle?: string;
  subtitleClassName?: string;
  buttonArea?: React.ReactNode;
  children?: React.ReactNode;
}

export function ModelPage({
  title,
  titleClassName,
  titleGap,
  subtitle,
  subtitleClassName,
  buttonArea,
  children,
}: ConfirmationPageProps): React.JSX.Element {
  return (
    <div className="w-full h-[inherit] shrink-0 p-4 pt-5 pb-0 flex flex-col justify-stretch items-center gap-4 text-theme-default overflow-hidden bg-theme-background">
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
