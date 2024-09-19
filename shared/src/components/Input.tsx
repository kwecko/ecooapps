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
  value?: string | number;
  defaultValue?: string;
  maxLength?: number;
  minLength?: number;
  step?: number;
  pattern?: string;
  required?: boolean;
  autoComplete?: string;
  labelClassName?: string;
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
  ...rest
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  const handleIconClick = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative flex flex-col text-slate-gray">
      <label className={twMerge("text-sm inter-font font-normal text-theme-primary pb-2 flex flex-row items-center justify-start gap-2", labelClassName)} htmlFor={label}>
        {label} {typeof error === "string" && (
          <div className="text-red-500 text-[12px] tracking-tighter">{error}</div>
        )}
      </label>
      <div className="relative">
        <input
          {...rest}
          {...register}
          className={`z-0 w-full p-3 border border-theme-primary rounded-lg inter-font font-normal ${className}`}
          type={inputType}
          onChange={onChange}
          onFocus={onFocus}
          defaultValue={defaultValue}
          value={value}
          maxLength={maxLength}
          minLength={minLength}
          autoComplete={autoComplete}
          step={step}
          pattern={pattern}
          required={required}
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
