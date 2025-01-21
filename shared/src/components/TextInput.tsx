import React from "react";
import { UseFormRegister } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface TextInputProps {
  name: string;
  label?: string;
  maxLength?: number;
  placeholder?: string;
  register: UseFormRegister<any>;
  defaultValue?: string;
  errorMessage?: string;
  showCharCount?: boolean;
  className?: string;
  disabled?: boolean;
}

function TextInput({
  name,
  label,
  maxLength = 500,
  placeholder,
  register,
  defaultValue = "",
  errorMessage,
  showCharCount = false,
  className,
  disabled,
}: TextInputProps) {
  const [charCount, setCharCount] = React.useState(defaultValue.length);

  function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setCharCount(e.target.value.length);
  }

  return (
    <div className="flex flex-col gap-1.75">
      {label && (
        <label className="text-theme-home-bg lg:text-theme-primary font-normal font-inter text-sm leading-4.75 tracking-tight-2">
          {label}
        </label>
      )}
      <textarea
        id={name}
        {...register(name)}
        maxLength={maxLength}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={handleInputChange}
        className={twMerge(
          "resize-none",
          "w-full rounded-lg border border-theme-home-bg text-theme-home-bg px-3 h-12 focus:outline-none p-3 font-inter font-normal tracking-tight-2 lg:border-theme-primary lg:text-theme-primary",
          disabled && "bg-gray-100 cursor-not-allowed text-gray-500",
          className
        )}
      />

      <div
        className={twMerge(
          "flex flex-row text-sm justify-between items-center mt-1",
          errorMessage && !showCharCount && "justify-start",
          !errorMessage && showCharCount && "justify-end"
        )}
      >
        {errorMessage && (
          <span className="text-sm text-red-500">{errorMessage}</span>
        )}
        {showCharCount && (
          <span className="text-gray-500">
            {charCount}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
}

export default TextInput;
