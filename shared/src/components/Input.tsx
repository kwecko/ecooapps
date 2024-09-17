import React, { ChangeEvent, ReactNode, useState } from "react";
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegisterReturn,
} from "react-hook-form";

interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  icon?: ReactNode;
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
      <label className="text-sm inter-font font-normal text-theme-primary">
        {label}
      </label>
      <div className="relative">
        <input
          {...rest}
          {...register}
          className={`z-0 w-full mt-2 p-3 border border-theme-primary rounded-lg inter-font font-normal ${className}`}
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
        {icon && (
          <div
            onClick={handleIconClick}
            className="cursor-pointer absolute text-xl top-[5px] right-0 pr-3 flex items-center h-full z-50"
          >
            {icon}
          </div>
        )}
      </div>
      {typeof error === "string" && (
        <div className="text-red-500 text-sm mt-1">{error}</div>
      )}
    </div>
  );
}
