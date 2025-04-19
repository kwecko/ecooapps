import { isUnderConstruction } from "@shared/library/is-under-construction";

import { twMerge } from "tailwind-merge";

import React, { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant: "default" | "light" | "transparent";
  border?: boolean;
  notification?: string;
  className?: string;
}

interface StyleClasses {
  default: string;
  variant: {
    default: string;
    light: string;
    transparent: string;
  };
  border: string;
}

const styles: StyleClasses = {
  default: "w-full p-3 font-semibold rounded-lg text-base relative",
  variant: {
    default: "text-white bg-theme-default",
    light: "text-theme-default bg-white",
    transparent: "text-theme-default",
  },
  border: "border-theme-default border-2",
};

export default function ButtonV2({
  href,
  disabled,
  children,
  className,
  variant,
  border,
  notification,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || (href ? isUnderConstruction(href) : false);

  const buttonClasses = twMerge(
    styles.default,
    styles.variant[variant],
    border && styles.border,
    isDisabled ? "opacity-50 cursor-not-allowed" : "",
    className
  );

  return (
    <button
      {...rest}
      disabled={isDisabled}
      className={twMerge(
        "lg:text-base lg:font-inter lg:tracking-tight-2 lg:leading-5.5 lg:font-semibold",
        buttonClasses,
        className
      )}
    >
      {children}
      {notification && (
        <span className="absolute top-0 right-0 mt-10-negative mr-10-negative flex h-5 w-5">
          <span className="relative inline-flex rounded-full h-5 w-5 bg-error text-white text-xs font-bold items-center justify-center">
            {notification}
          </span>
        </span>
      )}
    </button>
  );
}
