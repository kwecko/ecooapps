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
  disabled?: boolean;
  iconPosition?: "left" | "right";
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
  iconPosition = "right",
  ...rest
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  const handleIconClick = () => {
    setShowPassword(!showPassword);
  };

  const isLeftIcon = icon && iconPosition === "left";
  const isRightIcon = icon && iconPosition === "right";

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    if (onFocus) onFocus(event);
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLInputElement>) => {
    if (type === "date") {
      try {
        (event.currentTarget as unknown as { showPicker?: () => void })?.showPicker?.();
      } catch (err) {}
    }
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
          onFocus={handleFocus}
          onMouseDown={handleMouseDown}
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
        
        {isLeftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10 pointer-events-none">
            {icon}
          </div>
        )}
        
        {isRightIcon && (
          <div
            onClick={type === "password" ? handleIconClick : undefined}
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10 ${
              type === "password" ? "cursor-pointer" : "pointer-events-none"
            }`}
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
