import React, { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { isUnderConstruction } from "../library/is-under-construction";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
}

export default function Button({
  href,
  disabled,
  children,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || (href ? isUnderConstruction(href) : false);

  const buttonClasses = `${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`;

  return (
    <button
      {...rest}
      disabled={isDisabled}
      className={twMerge(buttonClasses, rest.className)}
    >
      {children}
    </button>
  );
}
