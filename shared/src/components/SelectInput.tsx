import React, { useEffect, useRef, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { FiChevronDown } from "react-icons/fi";

interface Option {
  value: string;
  label: string;
}

export interface SelectProps {
  options: Option[];
  placeholder?: string;
  label?: string;
  onChange?: (value: any) => void;
  disabled?: boolean;
  defaultOption?: Option;
  register?: UseFormRegisterReturn;
  useOnChange?: boolean;
  useUseRef?: boolean;
  errorMessage?: string;
  clear?: boolean;
}

export default function Select({
  options,
  label,
  onChange,
  placeholder = "Selecione...",
  disabled = false,
  defaultOption,
  register,
  useOnChange = true,
  useUseRef = true,
  errorMessage,
  clear = false,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const selectRef = useUseRef ? useRef<HTMLDivElement>(null) : null;

  useEffect(() => {
    if (clear) {
      setSelectedOption(null);
    }
  }, [clear]);

  useEffect(() => {
    if (defaultOption && !disabled) {
      setSelectedOption(defaultOption);
    } else {
      setSelectedOption(null);
    }
  }, [defaultOption, disabled]);

  const handleSelect = (option: Option) => {
    if (disabled) return;
    setSelectedOption(option);
    setIsOpen(false);
    useOnChange && onChange && onChange(option.value);
    register?.onChange({
      target: {
        name: register.name,
        value: option.value,
      },
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        useUseRef &&
        selectRef?.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={useUseRef ? selectRef : undefined}
      className="relative w-full pt-2 lg:flex lg:flex-col lg:gap-1.75 text-theme-home-bg lg:text-theme-primary lg:font-inter"
      {...register}
    >
      {label && (
        <label
          className={`block mb-2 lg:mb-0 text-sm lg:leading-4.75 lg:tracking-tight-2 lg:text-theme-primary font-inter ${
            disabled ? "text-gray-400" : "text-slate-gray lg:text-theme-primary"
          }`}
        >
          {label}
        </label>
      )}
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`flex justify-between items-center px-4 h-12 lg:h-auto lg:p-3 lg:text-base lg:font-normal lg:leading-5.5 lg:tracking-tight-2 lg:font-inter border rounded-lg cursor-pointer bg-white ${
          disabled
            ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
            : "border-slate-gray text-slate-gray lg:border-theme-primary lg:text-theme-primary hover:bg-gray-50"
        }`}
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <FiChevronDown
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          } ${
            disabled ? "text-gray-400" : "text-slate-gray lg:text-theme-primary"
          }`}
        />
      </div>
      {errorMessage && (
        <span className="text-sm text-red-500 mt-1">{errorMessage}</span>
      )}

      {!disabled && isOpen && (
        <ul className="absolute mt-1 lg:top-full w-full bg-white border border-slate-gray lg:border-theme-primary rounded-lg shadow-lg max-h-48 overflow-auto z-10">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option)}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                selectedOption?.value === option.value ? "bg-gray-100" : ""
              }`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
