import React, { useState, useEffect, useRef } from "react";
import { FiChevronDown } from "react-icons/fi";

interface Option {
  value: string;
  label: string;
}

export interface SelectProps {
  options: Option[];
  placeholder?: string;
  label?: string;
  onChange: (value: any) => void;
  disabled?: boolean;
  defaultOption?: Option;
}

export default function Select({
  options,
  label,
  onChange,
  placeholder = "Selecione...",
  disabled = false,
  defaultOption,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const selectRef = useRef<HTMLDivElement>(null);

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
    onChange(option.value);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
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
    <div ref={selectRef} className="relative w-full pt-2">
      {label && (
        <label
          className={`block mb-2 text-sm font-inter ${
            disabled ? "text-gray-400" : "text-slate-gray"
          }`}
        >
          {label}
        </label>
      )}
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`flex justify-between items-center px-4 h-12 border rounded-lg cursor-pointer bg-white ${
          disabled
            ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
            : "border-slate-gray text-slate-gray hover:bg-gray-50"
        }`}
      >
        <span>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <FiChevronDown
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          } ${disabled ? "text-gray-400" : "text-slate-gray"}`}
        />
      </div>

      {!disabled && isOpen && (
        <ul className="mt-1 w-full bg-white border border-slate-gray rounded-lg shadow-lg max-h-48 overflow-auto z-10">
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