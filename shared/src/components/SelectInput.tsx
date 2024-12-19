import React, { useEffect, useRef, useState } from "react";
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
  defaultOption?: Option;
}

export default function Select({
  options,
  placeholder,
  label,
  onChange,
  defaultOption,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (defaultOption) {
      setSelectedOption(defaultOption);
    }
  }, []);

  const handleSelect = (option: Option) => {
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
    <div ref={selectRef} className="relative w-full contents">
      {label && (
        <label className="w-full block mb-2 text-sm text-slate-gray font-inter ">
          {label}
        </label>
      )}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full justify-between items-center px-4 h-12 border gap-2 border-slate-gray rounded-lg cursor-pointer bg-white text-slate-gray"
      >
        {placeholder && !selectedOption && (
          <span className="text-gray-500 text-sm">{placeholder}</span>
        )}
        <span>{selectedOption ? selectedOption.label : ""}</span>
        <FiChevronDown
          className={`text-slate-gray transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>

      {isOpen && (
        <ul className="absolute mt-1 bg-white border border-slate-gray rounded-lg shadow-lg max-h-48 overflow-auto z-10">
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
