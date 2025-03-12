import React, { ChangeEvent, ReactNode, useState } from "react";
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegisterReturn,
} from "react-hook-form";
import { twMerge } from "tailwind-merge";


interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  icon?: any;
  label?: string;
  register?: UseFormRegisterReturn;
  type?: "email" | "password" | "text" | "number" | "date";
  className?: string;
  onChange?: (
    event: ChangeEvent<HTMLInputElement>
  ) => void | string | undefined;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  value?: string | number | Date;
  defaultValue?: string;
  maxLength?: number;
  minLength?: number;
  step?: number;
  pattern?: string;
  required?: boolean;
  autoComplete?: string;
  labelClassName?: string;
  disabled?: boolean
}

export default function Input({
  label,
  icon,
  error,
  register,
  type,
  className,
  onChange,
  onFocus,
  value,
  defaultValue,
  maxLength,
  minLength,
  step,
  pattern,
  required,
  autoComplete,
  labelClassName,
  disabled,
  ...rest
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  const handleIconClick = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative w-full flex flex-col text-theme-home-bg">
      <label className={twMerge("text-sm leading-4.75 font-inter font-normal pb-1.75 flex flex-row items-center justify-start gap-2 tracking-tight-2", labelClassName)} htmlFor={label}>
        {label} {typeof error === "string" && (
          <div className="text-red-500 text-xs leading-3 tracking-tight-2">{error}</div>
        )}
      </label>
      <div className="relative w-full">
        <input
          {...rest}
          {...register}
          className={`z-0 w-full h-12 px-3 border border-theme-primary rounded-lg font-inter font-normal box-border ${className}`}
          type={inputType}
          onChange={onChange}
          onFocus={onFocus}
          defaultValue={defaultValue}
          value={value instanceof Date ? value.toISOString().split('T')[0] : value}
          maxLength={maxLength}
          minLength={minLength}
          autoComplete={autoComplete}
          step={step}
          pattern={pattern}
          required={required}
          disabled={disabled}
        />
        {icon ? (
          <div
            onClick={handleIconClick}
            className="cursor-pointer absolute text-xl my-auto top-0 bottom-0 right-0 pr-3 flex items-center h-full z-50"
          >
            {icon}
          </div>
        ) : (null)}
      </div>
    </div>
  );
}
