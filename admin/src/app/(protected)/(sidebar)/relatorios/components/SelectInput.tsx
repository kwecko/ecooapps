import React, { useState, useEffect, useRef } from 'react';
import { HiMiniChevronUpDown } from "react-icons/hi2";

interface Option {
  value: string | boolean;
  label: string;
}

export interface SelectProps {
  options: Option[];
  placeholder?: string;
  label?: string;
  onChange: (value: any) => void;
  defaultOption?: Option
  disabled?: boolean
}

export default function Select({ options, label, onChange, defaultOption, disabled }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(defaultOption) {
      setSelectedOption(defaultOption);
    }
  }, [])

  const handleSelect = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange(option.value);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
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
      {label && <label className="block mb-1 text-theme-primary text-sm font-inter ">{label}</label>}
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`flex justify-between items-center px-4 h-12 border border-slate-gray rounded-md font-inter text-theme-primary ${disabled ? 'cursor-not-allowed opacity-50 bg-gray-200' : 'bg-white cursor-pointer'}`}
      >
        <span>{selectedOption ? selectedOption.label : ''}</span>
        <HiMiniChevronUpDown
          className={`text-slate-gray transition-transform duration-200`}
          size={25}
        />
      </div>

      {isOpen && (
      <ul className="absolute mt-1 w-full bg-white border border-slate-gray font-inter rounded-md text-theme-primary shadow-lg max-h-48 overflow-auto z-10">
        {options.map((option) => (
        <li
          key={typeof option.value === 'boolean' ? option.value.toString() : option.value}
          onClick={() => handleSelect(option)}
          className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
          selectedOption?.value === option.value ? 'bg-gray-100' : ''
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
